"use client";
import { Send, Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { ChatInputProps } from "@/lib/types/chatbot";
import useChatInput from "@/hooks/use-chatbot-input";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export function ChatInput({
  input,
  onInputChange,
  onSend,
  onToggleQuickActions,
  isAskingName,
  showQuickActions,
  disabled,
  isTyping,
}: ChatInputProps) {
  const { textareaRef, handleKeyDown } = useChatInput(disabled, input, onSend);

  return (
    <div className="p-4 border-t border-border bg-card shrink-0">
      <div className="flex gap-2 items-end">
        {/* Slash button to toggle quick actions */}
        <div className="quick-actions-tooltip-wrap relative">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onToggleQuickActions}
            disabled={disabled}
            className={cn(
              "shrink-0 h-10 w-10 rounded-xl transition-colors border-border",
              showQuickActions
                ? "bg-primary/10 text-primary border-primary"
                : "text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5"
            )}
            aria-label="Quick questions"
          >
            <Slash className="size-4" />
          </Button>
          {/* Tooltip */}
          <div className="quick-actions-tooltip absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-background text-foreground text-xs rounded-md whitespace-nowrap opacity-0 pointer-events-none z-50">
            Quick questions
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-0 border-4 border-transparent border-r-background" />
          </div>
        </div>

        {/* Flexible textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isAskingName ? "Enter your name..." : "Type your message..."
          }
          rows={1}
          className="flex-1 min-h-10 max-h-[120px] px-4 py-2.5 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm text-foreground placeholder:text-muted-foreground outline-none scrollbar-hide"
        />

        <Button
          onClick={() => {
            onSend();
            track(TRACKING_EVENTS.chatSendButton, "chatbot conversation");
          }}
          disabled={!input.trim() || isTyping}
          className="shrink-0 bg-primary hover:bg-primary/90 rounded-xl h-10 w-10"
          aria-label="Send message"
        >
          <Send className="size-4" />
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground text-center mt-2">
        Press{" "}
        <kbd className="px-1 py-0.5 bg-secondary rounded text-[9px]">
          Shift+Enter
        </kbd>{" "}
        for new line • Powered by Belvedere Pharmacy
      </p>
    </div>
  );
}
