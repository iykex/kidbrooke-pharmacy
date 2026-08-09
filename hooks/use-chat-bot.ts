import { useTenantContext } from "@/components/providers/tenant-provider";
import {
  findBestResponse,
  getChatHistory,
  getVisitorName,
  isIdleForTooLong,
  saveChatHistory,
  setVisitorName,
} from "@/lib/utils/chatbot";
import { getChatbotEntriesForTenant } from "@/lib/services/firestore/queries";
import type { ActionButton, KnowledgeBaseItem, Message } from "@/lib/types/chatbot";
import { useEffect, useRef, useState } from "react";

export function useChatbot() {
  const { tenant, slug, isTenantReady } = useTenantContext();
  const [isOpen, setIsOpen] = useState(false);
  const [visitorName, setVisitorNameState] = useState<string | null>(null);
  const [isAskingName, setIsAskingName] = useState(false);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseItem[]>([]);
  /** Latest KB for async handlers — state captured before `await` is often still []. */
  const knowledgeBaseRef = useRef<KnowledgeBaseItem[]>(knowledgeBase);

  const tenantInitKeyRef = useRef<string | null>(null);

  useEffect(() => {
    knowledgeBaseRef.current = knowledgeBase;
  }, [knowledgeBase]);

  useEffect(() => {
    let cancelled = false;
    getChatbotEntriesForTenant(slug)
      .then((entries) => {
        if (!cancelled) {
          setKnowledgeBase(
            entries.map((e) => ({
              keywords: e.keywords,
              answer: e.answer,
              actions: e.actions,
            })),
          );
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!isTenantReady || !tenant) return;

    const initKey = `${slug}:${tenant.displayName}:${tenant.bookAppointmentUrl}:${tenant.orderPrescriptionsUrl}`;
    if (tenantInitKeyRef.current === initKey) return;
    tenantInitKeyRef.current = initKey;

    const cachedName = getVisitorName();
    const chatHistory = getChatHistory();
    const isIdle = isIdleForTooLong();

    queueMicrotask(() => {
      if (cachedName) {
        setVisitorNameState(cachedName);

        if (chatHistory && chatHistory.length > 1 && isIdle) {
          setShowContinuePrompt(true);
          setMessages([
            {
              id: "continue-prompt",
              role: "bot",
              content: `Welcome back, ${cachedName}! 👋 You have a previous conversation. Would you like to continue where you left off or start fresh?`,
              timestamp: new Date(),
            },
          ]);
        } else if (chatHistory && chatHistory.length > 1 && !isIdle) {
          setMessages(chatHistory);
        } else {
          setMessages([
            {
              id: "welcome",
              role: "bot",
              content: `Welcome back, ${cachedName}! 👋 I'm Bella, your ${tenant.displayName} assistant. How can I help you today?`,
              timestamp: new Date(),
              actions: [
                {
                  label: "Book Appointment",
                  href: tenant.bookAppointmentUrl,
                  icon: "calendar",
                },
                {
                  label: "Order Prescription",
                  href: tenant.orderPrescriptionsUrl,
                  icon: "prescription",
                },
              ],
            },
          ]);
        }
      } else {
        setIsAskingName(true);
        setMessages([
          {
            id: "ask-name",
            role: "bot",
            content: `Hello! 👋 I'm Bella, your ${tenant.displayName} assistant. Before we start, may I know your name?`,
            timestamp: new Date(),
          },
        ]);
      }
    });
  }, [isTenantReady, tenant, slug]);

  useEffect(() => {
    if (messages.length > 0 && !showContinuePrompt) {
      saveChatHistory(messages);
    }
  }, [messages, showContinuePrompt]);

  const handleSend = async (messageText?: string) => {
    if (!isTenantReady || !tenant) return;
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setShowQuickActions(false);

    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 700),
    );

    try {
      let response: { answer: string; actions?: ActionButton[] };

      if (isAskingName) {
        const name = text.trim();
        setVisitorName(name);
        setVisitorNameState(name);
        setIsAskingName(false);
        response = {
          answer: `Nice to meet you, ${name}! 😊 I'm here to help you with any questions about ${tenant.displayName}. You can ask me about our services, opening hours, prescriptions, vaccinations, and more. What would you like to know?`,
          actions: [
            { label: "View Services", href: "/services", icon: "external" },
            {
              label: "Book Appointment",
              href: tenant.bookAppointmentUrl,
              icon: "calendar",
            },
          ],
        };
      } else {
        try {
          const apiRes = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: text,
              messagesHistory: messages,
              tenantSlug: slug,
              visitorName: visitorName,
            }),
          });
          if (apiRes.ok) {
            response = await apiRes.json();
          } else {
            response = findBestResponse(text, knowledgeBaseRef.current, tenant?.phone);
          }
        } catch {
          response = findBestResponse(text, knowledgeBaseRef.current, tenant?.phone);
        }
      }


      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response.answer,
        timestamp: new Date(),
        actions: response.actions,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content:
            "Sorry — something went wrong while I was replying. Please try again, or use the quick questions or contact options.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (query: string) => {
    setShowQuickActions(false);
    handleSend(query);
  };

  const handleContinueChat = (messagesArg: Message[]) => {
    setMessages(messagesArg);
    setShowContinuePrompt(false);
  };

  const handleStartNew = () => {
    if (!isTenantReady || !tenant) return;
    setShowContinuePrompt(false);
    setMessages([
      {
        id: "fresh-start",
        role: "bot",
        content: `Great, let's start fresh! 😊 How can I help you today, ${visitorName}?`,
        timestamp: new Date(),
        actions: [
          {
            label: "Book Appointment",
            href: tenant.bookAppointmentUrl,
            icon: "calendar",
          },
          {
            label: "Order Prescription",
            href: tenant.orderPrescriptionsUrl,
            icon: "prescription",
          },
        ],
      },
    ]);
  };

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleQuickActions = () => setShowQuickActions(!showQuickActions);

  return {
    isTenantReady,
    isOpen,
    visitorName,
    isAskingName,
    showContinuePrompt,
    messages,
    input,
    isTyping,
    showQuickActions,
    setInput,
    handleSend,
    handleQuickAction,
    handleContinueChat,
    handleStartNew,
    toggleChat,
    toggleQuickActions,
    setIsOpen,
  };
}
