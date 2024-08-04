import * as React from "react";
import Link from "next/link";
import { CookingPot, FilePenLine, LogIn } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TriggerSearchButton from "./search-button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LogOutButton from "./logout-button";

export default async function NavBar() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  const publicSection = (
    <>
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
      <TriggerSearchButton />
    </>
  );

  const adminSection = data.user ? (
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
  ) : null;

  const bottomSection = !data.user ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/login"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <LogIn className="h-5 w-5" />
          <span className="sr-only">Log In</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Log In</TooltipContent>
    </Tooltip>
  ) : (
    <LogOutButton />
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {publicSection}
        {adminSection}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        {bottomSection}
      </nav>
    </aside>
  );
}
