import {
  Ingredient,
  Quantity,
  Recipe,
  ScalableValue,
  Value,
} from "@/lib/recipeBindings";

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
