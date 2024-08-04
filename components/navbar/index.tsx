import * as React from "react";
import Link from "next/link";
import { CookingPot, FilePenLine } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TriggerSearchButton from "./search-button";

export default function NavBar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <CookingPot className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Let Him Cook home page</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Home</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/admin/manage-recipes"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FilePenLine className="h-5 w-5" />
              <span className="sr-only">Manage recipes</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Manage recipes</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
