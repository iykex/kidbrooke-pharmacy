'use client';
import { Bot, ChevronDown, UserSearch as IconUserSearch } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";


export function ChatHeader({ visitorName, onClose }: {  visitorName: string | null;
  onClose: () => void;}) {
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
    <div className="bg-card p-4 text-white shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="size-6" />
          </div>
          <span className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full border-2 border-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-lg">Bella</h3>
            <IconUserSearch
              strokeWidth="3"
              className="size-4 text-yellow-300 mt-1"
            />
          </div>
          <p className="text-xs text-white/70">
            {todayDate}
            {visitorName && <span className="ml-1">• {visitorName}</span>}
          </p>
        </div>
        <Button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/20 transition-colors bg-primary/70"
          aria-label="Close chat"
        >
          <ChevronDown className="size-5" />
        </Button>
      </div>
    </div>
  );
}
