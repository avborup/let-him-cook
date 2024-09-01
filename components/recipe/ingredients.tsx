import { Ingredient, Recipe, Value } from "@/lib/recipeBindings";

export const IngredientsList = ({ recipe }: { recipe: Recipe }) => {
  if (recipe.ingredients.length === 0) {
    return <p>Denne opskrift har ingen ingredienser.</p>;
  }

  return (
    <ul className="my-4 list-disc pl-5 space-y-3 leading-tight">
      {recipe.ingredients
        .filter(shouldShowInIngredientsList)
        .map((ingredient, index) => (
          <li key={index}>
            <IngredientItem ingredient={ingredient} />{" "}
            {ingredient.note && (
              <span className="text-sm text-gray-500	">({ingredient.note})</span>
            )}
          </li>
        ))}
    </ul>
  );
};

const ACCEPTED_INGREDIENT_MODIFIERS = ["OPT", ""];

const shouldShowInIngredientsList = (ingredient: Ingredient): boolean =>
  ACCEPTED_INGREDIENT_MODIFIERS.includes(ingredient.modifiers);

export const IngredientItem = ({ ingredient }: { ingredient: Ingredient }) => {
  const caseClasses = "inline-block first-letter:uppercase";

  return (
    <>
      {ingredient.quantity ? (
        <>
          <span className={caseClasses}>
            {getQuantityString(
              ingredient.quantity.unit,
              ingredient.quantity.value.value,
            )}
          </span>{" "}
        </>
      ) : null}
      <span className={ingredient.quantity ? "" : caseClasses}>
        {ingredient.name}
      </span>
    </>
  );
};

export const getQuantityString = (
  unit: string | undefined,
  amount: Value,
): string => {
  let output = "";
  switch (amount.type) {
    case "text":
      output += amount.value;
      break;
    case "number":
      const num = amount.value;
      switch (num.type) {
        case "regular":
          output += num.value;
          break;
        case "fraction":
          output += `${num.value.whole} ${num.value.num}/${num.value.den}`;
          break;
      }
      break;
    case "range":
      output += `${amount.value.start}-${amount.value.end}`;
      break;
  }

  if (unit) {
    output += ` ${unit}`;
  }

  return output;
};
