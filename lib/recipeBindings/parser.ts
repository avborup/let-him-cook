import { WasmModule } from "@/lib/wasm";
import { Recipe, RecipeResult } from ".";

export const parseRecipe = (wasm: WasmModule, input: string): RecipeResult => {
  const result = wasm.parse(input);
  return convertRecipeResult(result);
};

const convertRecipeResult = (input: Map<string, unknown>): RecipeResult => {
  // @ts-ignore
  function replacer(key: unknown, value: unknown) {
    if (value instanceof Map) {
      return [...value.entries()].reduce((acc, [key, value]) => {
        // @ts-ignore
        acc[key] = value;
        return acc;
      }, {});
    } else {
      return value;
    }
  }

  const jsonStr = JSON.stringify(input.get("recipe"), replacer, 2);

  return {
    recipe: JSON.parse(jsonStr) as Recipe,
    report: input.get("report") as string,
  };
};
