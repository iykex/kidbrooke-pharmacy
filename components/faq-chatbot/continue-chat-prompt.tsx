import { getChatHistory, clearChatHistory } from "@/lib/utils/chatbot";
import { ContinueChatPromptProps } from "@/lib/types/chatbot";
import { Button } from "../ui/button";

export function ContinueChatPrompt({
  onContinue,
  onStartNew,
}: ContinueChatPromptProps) {
  const handleContinue = () => {
    const history = getChatHistory();
    if (history) onContinue(history);
  };

  const handleStartNew = () => {
    clearChatHistory();
    onStartNew();
  };

  return (
    <div className="px-4 pb-2 shrink-0 border-t border-border pt-3">
      <div className="flex gap-2">
        <Button
          onClick={handleContinue}
          className="flex-1 px-4 py-2 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          Continue Chat
        </Button>
        <Button
          onClick={handleStartNew}
          className="flex-1 px-4 py-2 text-sm font-medium rounded-xl bg-secondary text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
        >
          Start New
        </Button>
      </div>
    </div>
  );
}
