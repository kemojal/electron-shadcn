import { Settings } from "lucide-react";
import { Button } from "./button";

export function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="h-8 w-8 hover:bg-gray-700/50"
    >
      <Settings className="h-5 w-5" />
    </Button>
  );
} 