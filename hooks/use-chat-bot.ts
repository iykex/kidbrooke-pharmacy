import { useTenantContext } from "@/components/providers/tenant-provider";
import {
  clearChatHistory,
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

  // Human Takeover States
  const [sessionId, setSessionId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("bella_session_id");
      if (!id) {
        id = `session_${Date.now()}`;
        localStorage.setItem("bella_session_id", id);
      }
      return id;
    }
    return `session_${Date.now()}`;
  });

  const [takenOverByHuman, setTakenOverByHuman] = useState(false);
  const [agentName, setAgentName] = useState<string | null>(null);
  const [agentIsTyping, setAgentIsTyping] = useState(false);

  const knowledgeBaseRef = useRef<KnowledgeBaseItem[]>(knowledgeBase);
  const tenantInitKeyRef = useRef<string | null>(null);

  useEffect(() => {
    knowledgeBaseRef.current = knowledgeBase;
  }, [knowledgeBase]);

  // Poll for live human takeover updates from server (only when chat window is open)
  useEffect(() => {
    if (!sessionId || !isOpen) return;
    let isCancelled = false;

    const pollSession = async () => {
      try {
        const res = await fetch(`/api/chat?sessionId=${sessionId}&tenantSlug=${slug}`);
        if (res.ok && !isCancelled) {
          const data = await res.json();
          setTakenOverByHuman(!!data.takenOverByHuman);
          setAgentName(data.agentName || null);
          setAgentIsTyping(!!data.agentIsTyping);

          if (data.messages && Array.isArray(data.messages)) {
            setMessages((prev) => {
              const existingIds = new Set(prev.map((m) => m.id));
              const newAgentMsgs = data.messages.filter((m: any) => !existingIds.has(m.id));
              if (newAgentMsgs.length > 0) {
                const updated = [
                  ...prev,
                  ...newAgentMsgs.map((m: any) => ({
                    id: m.id || String(Date.now()),
                    role: m.role === "agent" ? ("bot" as const) : (m.role as any),
                    content: m.content,
                    timestamp: new Date(m.timestamp || Date.now()),
                  })),
                ];
                saveChatHistory(updated);
                return updated;
              }
              return prev;
            });
          }
        }
      } catch {
        // Silent poll fallback
      }
    };

    void pollSession();
    const interval = setInterval(pollSession, 8000);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [sessionId, slug, isOpen]);

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

    const existingName = getVisitorName();
    const history = getChatHistory();

    if (history && history.length > 0) {
      if (isIdleForTooLong()) {
        setShowContinuePrompt(true);
        setMessages(history);
      } else {
        setMessages(history);
        setShowQuickActions(false);
      }
      if (existingName) {
        setVisitorNameState(existingName);
      }
    } else {
      setIsAskingName(true);
      setMessages([
        {
          id: "welcome-1",
          role: "bot",
          content: `Hello! 👋 Welcome to ${tenant.displayName}. I'm Bella, your AI pharmacy assistant. What's your name?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isTenantReady, tenant, slug]);

  const handleSend = async (customMessage?: string) => {
    const messageText = (customMessage || input).trim();
    if (!messageText || isTyping) return;

    if (!customMessage) setInput("");

    if (isAskingName) {
      setVisitorName(messageText);
      setVisitorNameState(messageText);
      setIsAskingName(false);

      const updated = [
        ...messages,
        {
          id: Date.now().toString(),
          role: "user" as const,
          content: messageText,
          timestamp: new Date(),
        },
        {
          id: (Date.now() + 1).toString(),
          role: "bot" as const,
          content: `Nice to meet you, ${messageText}! 😊 How can I help you today?`,
          timestamp: new Date(),
          actions: tenant
            ? [
                {
                  label: "Book Appointment",
                  href: tenant.bookAppointmentUrl,
                  icon: "calendar" as const,
                },
                {
                  label: "Order Prescription",
                  href: tenant.orderPrescriptionsUrl,
                  icon: "prescription" as const,
                },
              ]
            : undefined,
        },
      ];
      setMessages(updated);
      saveChatHistory(updated);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    saveChatHistory(newHistory);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          messagesHistory: messages,
          tenantSlug: slug,
          visitorName,
          sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.takenOverByHuman) {
          setTakenOverByHuman(true);
          if (data.agentName) setAgentName(data.agentName);
        }

        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: data.answer,
          actions: data.actions,
          timestamp: new Date(),
        };
        const finalHistory = [...newHistory, botMsg];
        setMessages(finalHistory);
        saveChatHistory(finalHistory);
        return;
      }

      const kb = knowledgeBaseRef.current;
      const result = findBestResponse(messageText, kb, tenant?.phone);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: result.answer,
        actions: result.actions,
        timestamp: new Date(),
      };
      const finalHistory = [...newHistory, botMsg];
      setMessages(finalHistory);
      saveChatHistory(finalHistory);
    } catch {
      const kb = knowledgeBaseRef.current;
      const result = findBestResponse(messageText, kb, tenant?.phone);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: result.answer,
        actions: result.actions,
        timestamp: new Date(),
      };
      const finalHistory = [...newHistory, botMsg];
      setMessages(finalHistory);
      saveChatHistory(finalHistory);
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
    const newId = `session_${Date.now()}`;
    setSessionId(newId);
    if (typeof window !== "undefined") localStorage.setItem("bella_session_id", newId);
    setShowContinuePrompt(false);
    setTakenOverByHuman(false);
    setAgentName(null);
    setMessages([
      {
        id: "fresh-start",
        role: "bot",
        content: `Great, let's start fresh! 😊 How can I help you today, ${visitorName || "friend"}?`,
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

  const handleEndChat = () => {
    clearChatHistory();
    setShowContinuePrompt(false);
    setShowQuickActions(true);
    setTakenOverByHuman(false);
    setAgentName(null);
    setMessages([
      {
        id: "ended-chat",
        role: "bot",
        content: `Chat ended. Thank you for visiting ${tenant?.displayName || "our pharmacy"}! If you need anything else, feel free to start a new chat below.`,
        timestamp: new Date(),
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
    takenOverByHuman,
    agentName,
    agentIsTyping,
    setInput,
    handleSend,
    handleQuickAction,
    handleContinueChat,
    handleStartNew,
    handleEndChat,
    toggleChat,
    toggleQuickActions,
    setIsOpen,
  };
}
