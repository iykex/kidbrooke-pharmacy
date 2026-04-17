"use client";

import { KeyboardEvent, useEffect, useRef } from "react";

export default function useChatInput(
  disabled: boolean,
  input: string,
  onSend: () => void
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  // Auto-focus on desktop when opened
  useEffect(() => {
    if (!disabled && textareaRef.current) {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile) {
        textareaRef.current.focus();
      }
    }
  }, [disabled]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return { textareaRef, handleKeyDown };
}
