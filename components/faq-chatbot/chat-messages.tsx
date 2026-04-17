import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import { ChatMessage } from "./chat-message";
import type { Message } from "@/lib/types/chatbot";


export function ChatMessages({ messages, isTyping }: {  messages: Message[];
  isTyping: boolean;
  onScrollEnd: (ref: HTMLDivElement | null) => void;}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[350px] scrollbar-hide">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex gap-2 justify-start">
          <div className="size-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
            <Bot className="size-4 text-primary" />
          </div>
          <div className="bg-gray-100 dark:bg-[#002f4b] rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex gap-1">
              <span className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="size-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
