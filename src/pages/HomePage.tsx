import React, { useState } from "react";
import { SettingsButton } from "../components/ui/SettingsButton";
import { SettingsModal } from "../components/SettingsModal";

export default function HomePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  return (
    <div className="bg-background flex h-full w-full items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <SettingsButton onClick={() => setIsSettingsOpen(true)} />
      </div>

      <div className="text-foreground">Take Screenshot</div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
    </div>
  );
}
