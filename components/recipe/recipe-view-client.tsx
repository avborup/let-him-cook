"use client";

import { RecipeView, RecipeViewProps } from "@/components/recipe/recipe";
import { WasmModule, importWasm } from "@/lib/wasm";
import React from "react";

export function RecipeViewClient(props: RecipeViewProps) {
  const [wasm, setWasm] = React.useState<null | WasmModule>(null);

  React.useEffect(() => {
    importWasm().then(setWasm);
  }, []);

  return wasm ? <RecipeView {...props} wasm={wasm} /> : undefined;
}

export default RecipeViewClient;
