'use client';

import { Bot, ChevronDown, LogOut, UserSearch as IconUserSearch } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export function ChatHeader({
  visitorName,
  onClose,
  onEndChat,
}: {
  visitorName: string | null;
  onClose: () => void;
  onEndChat?: () => void;
}) {
  const [todayDate] = useState(() => {
    const date = new Date();
    const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
    const dayMonth = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    return `${weekday} ${dayMonth}`;
  });

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="size-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="size-6" />
          </div>
          <span className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full border-2 border-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-lg leading-tight">Bella</h3>
            <IconUserSearch
              strokeWidth="3"
              className="size-4 text-yellow-300"
            />
          </div>
          <p className="text-xs text-white/80 truncate">
            {todayDate}
            {visitorName && <span className="ml-1">• {visitorName}</span>}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {onEndChat && (
            <button
              type="button"
              onClick={onEndChat}
              className="flex items-center gap-1 text-xs bg-white/20 hover:bg-red-600 text-white font-medium px-2.5 py-1.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              title="End this chat session"
            >
              <LogOut className="size-3.5" />
              <span>End Chat</span>
            </button>
          )}

          <Button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Minimize chat"
          >
            <ChevronDown className="size-5" />
          </Button>
        </div>
      </div>
      <div className="mt-2.5 text-[10px] bg-black/20 text-white/90 px-2.5 py-1 rounded flex items-center gap-1 font-medium">
        <span>⚠️ Bella is an AI assistant and cannot prescribe medication. Consult a pharmacist for medical advice.</span>
      </div>
    </div>
  );
}
