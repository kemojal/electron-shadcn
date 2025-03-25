import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { SelectLanguage } from "./SelectLanguage";
import {
  IconSettings,
  IconKeyboard,
  IconLanguage,
  IconLogout,
  IconHelp,
  IconCreditCard,
  IconCamera,
  IconWindowMaximize,
  IconBrain,
} from "@tabler/icons-react";

export function SettingsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border-[1px] border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
        <IconSettings className="h-4 w-4" />
        Preferences
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2">
        <DropdownMenuLabel className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
          <IconKeyboard className="h-4 w-4" />
          Keyboard Shortcuts
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="px-2 py-1.5 text-sm">
            <div className="flex items-center gap-2">
              <IconCamera className="h-4 w-4" />
              Take Screenshot
            </div>
            <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 py-1.5 text-sm">
            <div className="flex items-center gap-2">
              <IconWindowMaximize className="h-4 w-4" />
              Toggle Window
            </div>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 py-1.5 text-sm">
            <div className="flex items-center gap-2">
              <IconBrain className="h-4 w-4" />
              Solve Problem
            </div>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 py-1.5 text-sm">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <IconLanguage className="h-4 w-4" />
                Language
              </div>
              <SelectLanguage />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled className="px-2 py-1.5 text-sm opacity-70">
            <div className="w-full space-y-1">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconCreditCard className="h-4 w-4" />
                  Credit remaining
                </div>
                <div>50/50</div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Buy more credits at buddy.ai
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="px-2 py-1.5 text-sm">
          <div className="flex items-center gap-2">
            <IconHelp className="h-4 w-4" />
            Support
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-2 py-1.5 text-sm text-red-600 dark:text-red-400">
          <div className="flex items-center gap-2">
            <IconLogout className="h-4 w-4" />
            Log out
          </div>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
