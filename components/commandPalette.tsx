"use client";

import * as React from "react";
import { ListBulletIcon, FileTextIcon } from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/database.types";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const supabase = createClient();

  const [recipes, setRecipes] = React.useState<Tables<"recipes">[] | null>(
    null,
  );

  React.useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await supabase.from("recipes").select();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const goToPage = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => goToPage("/recipes")}>
            <ListBulletIcon className="mr-2 h-4 w-4" />
            <span>All recipes</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recipes">
          {recipes?.map((recipe) => (
            <CommandItem
              key={recipe.id}
              onSelect={() => goToPage(`/recipes/${recipe.id}`)}
            >
              <FileTextIcon className="mr-2 h-4 w-4" />
              <span>{recipe.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
