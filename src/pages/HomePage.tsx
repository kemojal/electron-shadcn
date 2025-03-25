import React, { useState } from "react";
import { SettingsDropdown } from "../components/SettingsDropdown";

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white p-4">
      <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-300 p-8 shadow-lg">
        <SettingsDropdown />
      </div>
    </div>
  );
}
