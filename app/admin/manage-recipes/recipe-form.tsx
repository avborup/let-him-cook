import dynamic from "next/dynamic";

export const RecipeForm = dynamic(
  () => import("@/components/form/recipe-form").then((mod) => mod.RecipeForm),
  { ssr: false },
);
