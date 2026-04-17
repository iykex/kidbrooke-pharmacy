export interface ActionButton {
  label: string;
  href: string;
  icon?: "calendar" | "phone" | "location" | "external" | "prescription";
}

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  actions?: ActionButton[];
}

export interface KnowledgeBaseItem {
  keywords: string[];
  answer: string;
  actions?: ActionButton[];
}

export interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onToggleQuickActions: () => void;
  isAskingName: boolean;
  showQuickActions: boolean;
  disabled: boolean;
  isTyping: boolean;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ContinueChatPromptProps {
  visitorName: string | null;
  onContinue: (messages: Message[]) => void;
  onStartNew: () => void;
}

export interface QuickActionsPanelProps {
  onQuickAction: (query: string) => void;
}
