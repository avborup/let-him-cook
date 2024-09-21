import { RecipeView, RecipeViewProps } from "@/components/recipe/recipe";
import { isMobileDevice } from "@/lib/mobile";
import { importWasm } from "@/lib/wasm";
import React from "react";

export async function RecipeViewServer(props: RecipeViewProps) {
  const wasm = await importWasm();
  const isMobile = isMobileDevice();
  return <RecipeView {...props} wasm={wasm} isMobile={isMobile} />;
}

export default RecipeViewServer;
