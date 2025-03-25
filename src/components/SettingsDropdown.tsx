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

const menuItems = [
  {
    type: "label",
    icon: IconKeyboard,
    label: "Keyboard Shortcuts",
  },
  {
    type: "group",
    items: [
      {
        icon: IconCamera,
        label: "Take Screenshot",
        description: "Capture the current window or selection",
        shortcut: "⌘H",
      },
      {
        icon: IconWindowMaximize,
        label: "Toggle Window",
        description: "Show or hide the application window",
        shortcut: "⌘B",
      },
      {
        icon: IconBrain,
        label: "Solve Problem",
        description: "Get AI assistance for your code",
        shortcut: "⌘S",
      },
      {
        icon: IconLanguage,
        label: "Language",
        custom: (
          <div className="flex gap-2 justify-between items-center w-full">
            <div>Language</div>
            <SelectLanguage />
          </div>
        ),
      },
    ],
  },
  {
    type: "group",
    items: [
      {
        icon: IconCreditCard,
        label: "Credit remaining",
        disabled: true,
        custom: (
          <div className="space-y-1 w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <IconCreditCard className="w-4 h-4" />
                Credit remaining
              </div>
              <div>50/50</div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Buy more credits at buddy.ai
            </div>
          </div>
        ),
      },
    ],
  },
  {
    type: "item",
    icon: IconHelp,
    label: "Support",
    disabled: true,
  },
  {
    type: "item",
    icon: IconLogout,
    label: "Log out",
    shortcut: "⇧⌘Q",
    className: "text-red-600 dark:text-red-400",
  },
];

export function SettingsDropdown() {
  const renderMenuItem = (item: any) => {
    if (item.type === "label") {
      return (
        <DropdownMenuLabel className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
          <item.icon className="w-4 h-4" />
          {item.label}
        </DropdownMenuLabel>
      );
    }

    if (item.type === "group") {
      return (
        <DropdownMenuGroup>
          {item.items.map((groupItem: any, idx: number) => (
            <DropdownMenuItem
              key={idx}
              disabled={groupItem.disabled}
              className={`px-2 py-1.5 text-sm ${groupItem.className || ""}`}
            >
              {groupItem.custom || (
                <div className="flex gap-2 items-center">
                  <groupItem.icon className="w-4 h-4" />
                  <div>
                    <div>{groupItem.label}</div>
                    {groupItem.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {groupItem.description}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {groupItem.shortcut && (
                <DropdownMenuShortcut>
                  {groupItem.shortcut}
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      );
    }

    return (
      <DropdownMenuItem
        disabled={item.disabled}
        className={`px-2 py-1.5 text-sm ${item.className || ""}`}
      >
        <div className="flex gap-2 items-center">
          <item.icon className="w-4 h-4" />
          {item.label}
        </div>
        {item.shortcut && (
          <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border-[1px] border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
        <IconSettings className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 w-72 text-sm">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {renderMenuItem(item)}
            {index < menuItems.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
