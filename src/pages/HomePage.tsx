import React, { useState } from "react";
import { SettingsDropdown } from "../components/SettingsDropdown";

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  return (
    <div className="p-12 flex-full">
      <SettingsDropdown />
    </div>
  );
}
