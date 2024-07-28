import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Recipe, Parser, getImageURL, Ingredient } from "@cooklang/cooklang-ts";

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
      <Heading>Ingredienser</Heading>
      <IngredientsList ingredients={recipe.ingredients} />
    </>
  );
}

const IngredientsList = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <ul className="list-disc pl-5 space-y-3">
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

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="mb-4 text-4xl font-bold leading-none tracking-tight ">
      {children}
    </h2>
  );
};
