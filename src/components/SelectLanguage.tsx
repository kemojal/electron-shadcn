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
  IconBrandJava,
  IconBrandCpp,
} from "@tabler/icons-react";

const languages = [
  { value: "python", label: "Python", icon: IconBrandPython },
  { value: "javascript", label: "JavaScript", icon: IconBrandJavascript },
  { value: "typescript", label: "TypeScript", icon: IconBrandTypescript },
  { value: "java", label: "Java", icon: IconBrandJava },
  { value: "cpp", label: "C++", icon: IconBrandCpp },
];

export function SelectLanguage() {
  return (
    <Select defaultValue="python">
      <SelectTrigger className="h-8 w-[130px] border-gray-200 bg-transparent text-sm dark:border-gray-700">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {languages.map(({ value, label, icon: Icon }) => (
          <SelectItem
            key={value}
            value={value}
            className="flex cursor-pointer items-center gap-2 py-1.5 pl-2 text-sm"
          >
            <Icon className="h-4 w-4" />
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
