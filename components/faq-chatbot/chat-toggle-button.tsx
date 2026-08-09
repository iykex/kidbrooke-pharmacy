"use client";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { Button } from "../ui/button";
import type { ChatToggleButtonProps } from "@/lib/types/chatbot";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  return (
    <Button
      onClick={() => {
        onClick();
        track(TRACKING_EVENTS.chatToggleButton, "chatbot toggled");
      }}
      className={cn(
        "fixed bottom-6 lg:bottom-8 right-6 lg:right-8 z-40 flex items-center justify-center size-11 lg:size-12 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer",
        "bg-gradient-to-br from-primary to-primary/90 text-white border-2 border-white/20 shadow-primary/30",
        "hover:shadow-primary/50 hover:shadow-2xl",
        isOpen && "rotate-90"
      )}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}

      {/* Pulse animation when closed */}
      {!isOpen && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-10" />
      )}
    </Button>
  );
}
