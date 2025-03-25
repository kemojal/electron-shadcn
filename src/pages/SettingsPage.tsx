import { useState } from "react";
import { X } from "lucide-react";
import { programmingLanguages } from "../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function SettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  return (
    <div className="h-screen bg-gray-800 p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button
          onClick={() => window.electron.closeSettings()}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full bg-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800">
              {programmingLanguages.map((lang) => (
                <SelectItem
                  key={lang}
                  value={lang}
                  className="hover:bg-gray-700"
                >
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Keyboard Shortcuts</label>
          <div className="text-sm text-gray-400">
            <div className="flex justify-between py-1">
              <span>Toggle Window</span>
              <kbd className="rounded bg-gray-700 px-2 py-0.5">⌘B</kbd>
            </div>
            <div className="flex justify-between py-1">
              <span>Take Screenshot</span>
              <kbd className="rounded bg-gray-700 px-2 py-0.5">⌘H</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
