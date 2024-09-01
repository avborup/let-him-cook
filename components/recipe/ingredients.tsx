import {
  CooklangNumber,
  Ingredient,
  Recipe,
  Value,
} from "@/lib/recipeBindings";

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

export const cooklangNumberToString = (num: CooklangNumber): string => {
  switch (num.type) {
    case "regular":
      return num.value.toString();
    case "fraction":
      return `${num.value.whole} ${num.value.num}/${num.value.den}`;
  }
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
      output += cooklangNumberToString(amount.value);
      break;
    case "range":
      output += `${cooklangNumberToString(amount.value.start)}-${cooklangNumberToString(amount.value.end)}`;
      break;
  }

  if (unit) {
    output += ` ${unit}`;
  }

  return output;
};
