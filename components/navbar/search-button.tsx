"use client";

import { Search } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function TriggerSearchButton() {
  const onSearchClick = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true }),
    );
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            onClick={onSearchClick}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </span>
        </TooltipTrigger>
        <TooltipContent side="right">
          Search (shortcut:{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
          )
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
