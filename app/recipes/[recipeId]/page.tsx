import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Recipe, Parser, getImageURL, Ingredient } from "@cooklang/cooklang-ts";
import { Heading2 } from "@/components/typography/h2";

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

  console.log(recipe);

  return (
    <>
      <Heading2>Ingredienser</Heading2>
      <IngredientsList ingredients={recipe.ingredients} />
    </>
  );
}

const IngredientsList = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <ul className="my-4 list-disc pl-5 space-y-3">
      {ingredients.map((ingredient, index) => (
        <IngredientItem key={index} ingredient={ingredient} />
      ))}
    </ul>
  );
};

const IngredientItem = ({ ingredient }: { ingredient: Ingredient }) => {
  const hasQuantity = ingredient.quantity !== "";
  const caseClasses = "inline-block first-letter:uppercase";

  return (
    <li>
      {hasQuantity ? (
        <>
          <span className={caseClasses}>
            {ingredient.quantity} {ingredient.units}
          </span>{" "}
        </>
      ) : null}
      <span className={hasQuantity ? "" : caseClasses}>{ingredient.name}</span>
    </li>
  );
};
