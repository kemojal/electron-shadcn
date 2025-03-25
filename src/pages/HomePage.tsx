import React, { useState } from "react";
import { SettingsDropdown } from "../components/SettingsDropdown";
import {
  IconX,
  IconMinus,
  IconSquare,
} from "@tabler/icons-react";

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  const handleClose = () => {
    window.electron.closeWindow();
  };

  const handleMinimize = () => {
    window.electron.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electron.maximizeWindow();
  };

  return (
    <div className="flex justify-between px-4 py-1 bg-white rounded-xl shadow-xl flex-full">
      <SettingsDropdown />

      <div className="flex gap-2 items-center no-drag">
        <button
          onClick={handleMinimize}
          className="p-1 rounded-md transition-colors hover:bg-gray-100"
          aria-label="Minimize"
        >
          <IconMinus className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={handleMaximize}
          className="p-1 rounded-md transition-colors hover:bg-gray-100"
          aria-label="Maximize"
        >
          <IconSquare className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={handleClose}
          className="p-1 rounded-md transition-colors hover:bg-red-100 hover:text-red-600"
          aria-label="Close"
        >
          <IconX className="w-4 h-4 text-gray-600 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
}
