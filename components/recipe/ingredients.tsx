import { Ingredient, Recipe } from "@cooklang/cooklang-ts";

export const IngredientsList = ({ recipe }: { recipe: Recipe }) => {
  return (
    <ul className="my-4 list-disc pl-5 space-y-3 leading-tight">
      {recipe.ingredients.map((ingredient, index) => (
        <IngredientItem key={index} ingredient={ingredient} />
      ))}
    </ul>
  );
};

export const IngredientItem = ({ ingredient }: { ingredient: Ingredient }) => {
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
