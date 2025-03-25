import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectLanguage() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Supported Languages</SelectLabel>
          <SelectItem value="apple">Python</SelectItem>
          <SelectItem value="banana">JavaScript</SelectItem>
          <SelectItem value="blueberry">Golang</SelectItem>
          <SelectItem value="grapes">C++</SelectItem>
          <SelectItem value="pineapple">Java</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
