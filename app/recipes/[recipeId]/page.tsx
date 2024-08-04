import { RecipeView } from "@/components/recipe/recipe";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function RecipePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const supabase = createClient();
  const { data } = await supabase
    .from("recipes")
    .select()
    .eq("id", params.recipeId)
    .limit(1)
    .single();

  if (!data) {
    notFound();
  }

  return <RecipeView data={data} />;
}
