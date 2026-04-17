import Link from "next/link";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { ActionIcon } from "./action-icon";
import type { ChatMessageProps } from "@/lib/types/chatbot";

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-2",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {message.role === "bot" && (
        <div className="size-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
          <Bot className="size-4 text-primary" />
        </div>
      )}

      <div className="max-w-[80%] space-y-2">
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm",
            message.role === "user"
              ? "bg-primary text-white rounded-br-md"
              : "bg-card text-gray-800 dark:text-gray-200 rounded-bl-md"
          )}
        >
          <p className="leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <span
            className={cn(
              "text-[10px] mt-1 block",
              message.role === "user"
                ? "text-white/60"
                : "text-gray-400 dark:text-gray-500"
            )}
          >
            {message.timestamp instanceof Date &&
            !Number.isNaN(message.timestamp.getTime())
              ? message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
        </div>

        {/* Action Buttons */}
        {message.role === "bot" &&
          message.actions &&
          message.actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {message.actions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <ActionIcon icon={action.icon} />
                  {action.label}
                </Link>
              ))}
            </div>
          )}
      </div>

      {message.role === "user" && (
        <div className="size-8 rounded-full bg-gray-200 dark:bg-[#004d73] flex items-center justify-center shrink-0">
          <User className="size-4 text-gray-600 dark:text-gray-300" />
        </div>
      )}
    </div>
  );
}
