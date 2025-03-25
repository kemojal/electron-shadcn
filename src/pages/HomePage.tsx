import React, { useState } from "react";
import { SettingsDropdown } from "../components/SettingsDropdown";

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  return (
    <div className="flex justify-between p-4 bg-white rounded-xl shadow-xl flex-full">
      <SettingsDropdown />

      <div className="flex gap-1 items-center">
        <div>close</div>
        <div>minimize</div>
        <div>maximize</div>
      </div>
    </div>
  );
}
