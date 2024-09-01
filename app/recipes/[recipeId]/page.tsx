import RecipeView from "@/components/recipe/recipe-view-server";
import { createClient } from "@/utils/supabase/client";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

export const revalidate = 3600; // invalidate every hour

export default async function RecipePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const getRecipe = unstable_cache(
    async () => {
      const supabase = createClient();

      const { data } = await supabase
        .from("recipes")
        .select()
        .eq("id", params.recipeId)
        .limit(1)
        .single();

      return data;
    },
    ["recipe", params.recipeId],
    {
      revalidate: 3600,
      tags: ["recipe"],
    },
  );

  const data = await getRecipe();

  if (!data) {
    notFound();
  }

  return <RecipeView data={data} />;
}

export async function generateStaticParams() {
  const supabase = createClient();

  const results = await supabase.from("recipes").select("id");

  return (results.data ?? []).map(({ id }) => ({ recipeId: id }));
}
