import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const programmingLanguages = [
  "Python",
  "Java",
  "JavaScript",
  "Go",
  "C++",
  "Kotlin",
  "Swift",
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  selectedLanguage,
  onLanguageChange,
}: SettingsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select
              value={selectedLanguage}
              onValueChange={onLanguageChange}
            >
              <SelectTrigger className="w-full bg-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
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
                <kbd className="px-2 py-0.5 bg-gray-700 rounded">⌘B</kbd>
              </div>
              <div className="flex justify-between py-1">
                <span>Take Screenshot</span>
                <kbd className="px-2 py-0.5 bg-gray-700 rounded">⌘H</kbd>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 