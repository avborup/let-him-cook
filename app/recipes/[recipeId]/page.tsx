import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Recipe, Parser, getImageURL, Ingredient } from "@cooklang/cooklang-ts";
import { Heading2 } from "@/components/typography/h2";
import { IngredientsList } from "@/components/recipe/ingredients";
import { StepsList } from "@/components/recipe/steps";

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

  const recipe = new Recipe(data.cooklang, {
    includeStepNumber: true,
    defaultIngredientAmount: "",
  });

  console.log(JSON.stringify(recipe, null, 2));

  return (
    <>
      <Heading2 className="pt-4">Ingredienser</Heading2>
      <IngredientsList recipe={recipe} />
      <Heading2 className="pt-4">Fremgangsmåde</Heading2>
      <StepsList recipe={recipe} />
    </>
  );
}
