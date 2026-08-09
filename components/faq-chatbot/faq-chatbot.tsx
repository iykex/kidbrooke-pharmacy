"use client";

import { cn } from "@/lib/utils/utils";
import { useChatbot } from "@/hooks/use-chat-bot";
import { ChatToggleButton } from "./chat-toggle-button";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { QuickActionsPanel } from "./quick-actions-panel";
import { ContinueChatPrompt } from "./continue-chat-prompt";
import { ChatInput } from "./chat-input";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export default function FAQChatbot() {
  const {
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
    handleEndChat,
    toggleChat,
    toggleQuickActions,
    setIsOpen,
  } = useChatbot();

  return (
    <div>
      {/* Chat Toggle Button */}
      <ChatToggleButton
        isOpen={isOpen}
        onClick={() => {
          toggleChat();
          track(TRACKING_EVENTS.chatToggleButton, "chatbot toggled");
        }}
      />

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(580px,calc(100vh-5rem))] max-h-[calc(100vh-3.5rem)] rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right",
          "bg-background border border-border",
          "flex flex-col overflow-hidden",
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <ChatHeader
          visitorName={visitorName}
          onClose={() => setIsOpen(false)}
          onEndChat={handleEndChat}
        />

        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          onScrollEnd={() => {}}
        />

        {/* Quick Actions or Continue Prompt */}
        {showQuickActions && !isAskingName && !showContinuePrompt && (
          <QuickActionsPanel onQuickAction={handleQuickAction} />
        )}

        {showContinuePrompt && (
          <ContinueChatPrompt
            visitorName={visitorName}
            onContinue={handleContinueChat}
            onStartNew={handleStartNew}
          />
        )}

        <ChatInput
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          onToggleQuickActions={toggleQuickActions}
          isAskingName={isAskingName}
          showQuickActions={showQuickActions}
          disabled={!isOpen}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
}
