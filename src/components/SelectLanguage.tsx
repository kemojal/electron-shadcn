import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  IconBrandPython,
  IconBrandJavascript,
  IconBrandTypescript,
  IconCode,
  IconBrandCpp,
  IconBrandRust,
  IconBrandPhp,
  IconBrandSwift,
} from "@tabler/icons-react";

const programmingLanguages = [
  { value: "python", label: "Python", icon: IconBrandPython },
  { value: "javascript", label: "JavaScript", icon: IconBrandJavascript },
  { value: "typescript", label: "TypeScript", icon: IconBrandTypescript },
  { value: "java", label: "Java", icon: IconCode },
  { value: "cpp", label: "C++", icon: IconBrandCpp },
  { value: "go", label: "Go", icon: IconCode },
  { value: "rust", label: "Rust", icon: IconBrandRust },
  // { value: "php", label: "PHP", icon: IconBrandPhp },
  // { value: "swift", label: "Swift", icon: IconBrandSwift },
];

export function SelectLanguage() {
  return (
    <Select defaultValue="python">
      <SelectTrigger className="h-8 w-[120px] border-gray-200 bg-transparent text-sm focus:ring-gray-400 dark:border-gray-700">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
        {programmingLanguages.map(({ value, label, icon: Icon }) => (
          <SelectItem
            key={value}
            value={value}
            className="flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pl-2 text-sm data-[highlighted]:bg-gray-100 dark:text-gray-100 dark:data-[highlighted]:bg-gray-700"
          >
            <div className="flex gap-2 items-center w-full h-full">
              {" "}
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
