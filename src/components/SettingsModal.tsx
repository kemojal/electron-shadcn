import React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
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
      <DialogContent className="fixed border-gray-700 bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
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
      </DialogContent>
    </Dialog>
  );
}
