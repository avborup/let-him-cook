import { RecipeView, RecipeViewProps } from "@/components/recipe/recipe";
import { importWasm } from "@/lib/wasm";
import React from "react";

export async function RecipeViewServer(props: RecipeViewProps) {
  const wasm = await importWasm();
  return <RecipeView {...props} wasm={wasm} />;
}

export default RecipeViewServer;
