import { Ingredient, Recipe } from "@cooklang/cooklang-ts";

export const IngredientsList = ({ recipe }: { recipe: Recipe }) => {
  if (recipe.ingredients.length === 0) {
    return <p>Denne opskrift har ingen ingredienser.</p>;
  }

  return (
    <ul className="my-4 list-disc pl-5 space-y-3 leading-tight">
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>
          <IngredientItem ingredient={ingredient} />
        </li>
      ))}
    </ul>
  );
};

export const IngredientItem = ({ ingredient }: { ingredient: Ingredient }) => {
  const hasQuantity = ingredient.quantity !== "";
  const caseClasses = "inline-block first-letter:uppercase";

  return (
    <>
      {hasQuantity ? (
        <>
          <span className={caseClasses}>
            {ingredient.quantity} {ingredient.units}
          </span>{" "}
        </>
      ) : null}
      <span className={hasQuantity ? "" : caseClasses}>{ingredient.name}</span>
    </>
  );
};
