import React, { useState } from "react";
import { SettingsDropdown } from "../components/SettingsDropdown";
import { IconX, IconMinus, IconSquare } from "@tabler/icons-react";

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClose = () => {
    window.electron.closeWindow();
  };

  const handleMinimize = () => {
    window.electron.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electron.maximizeWindow();
  };

  const handleMouseEnter = () => {
    window.electron.setIgnoreMouseEvents(false);
  };

  const handleMouseLeave = () => {
    if (!isDropdownOpen) {
      window.electron.setIgnoreMouseEvents(true, { forward: true });
    }
  };

  return (
    <div
      className="flex-full flex justify-between rounded-xl bg-white px-4 py-1 shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SettingsDropdown onOpenChange={setIsDropdownOpen} />

      <div className="no-drag flex items-center gap-2">
        <button
          onClick={handleMinimize}
          className="rounded-md p-1 transition-colors hover:bg-gray-100"
          aria-label="Minimize"
        >
          <IconMinus className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={handleMaximize}
          className="rounded-md p-1 transition-colors hover:bg-gray-100"
          aria-label="Maximize"
        >
          <IconSquare className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={handleClose}
          className="rounded-md p-1 transition-colors hover:bg-red-100 hover:text-red-600"
          aria-label="Close"
        >
          <IconX className="h-4 w-4 text-gray-600 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
}
