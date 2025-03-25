import { Settings } from "lucide-react";
import { Button } from "./button";
import { forwardRef } from "react";

interface SettingsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export const SettingsButton = forwardRef<
  HTMLButtonElement,
  SettingsButtonProps
>(({ onClick, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="h-8 w-8 hover:bg-gray-700/50"
      {...props}
    >
      <Settings className="h-5 w-5" />
    </Button>
  );
});

SettingsButton.displayName = "SettingsButton";
