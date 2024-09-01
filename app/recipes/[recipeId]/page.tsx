import RecipeView from "@/components/recipe/recipe-view-server";
import { isUuid } from "@/lib/uuid";
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

      const select = supabase.from("recipes").select();

      const query = isUuid(params.recipeId)
        ? select.eq("id", params.recipeId)
        : select.eq("slug", params.recipeId);

      const { data } = await query.limit(1).single();

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

  const results = await supabase.from("recipes").select("slug");

  return (results.data ?? []).map(({ slug }) => ({ recipeId: slug }));
}
