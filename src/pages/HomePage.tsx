import React, { useState } from "react";
import { SettingsDropdown } from "../components/SettingsDropdown";

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  return (
    <div className="flex justify-center items-center p-4 w-full h-screen bg-white">
      <div className="flex flex-col gap-4 items-center p-8 rounded-lg border border-gray-300 shadow-lg">
        <SettingsDropdown />
      </div>
    </div>
  );
}
