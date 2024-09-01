import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IngredientItem, getQuantityString } from "./ingredients";
import {
  Content,
  Ingredient,
  Recipe,
  Section,
  Step,
} from "@/lib/recipeBindings";

export const StepSections = ({ recipe }: { recipe: Recipe }) => {
  return (
    <TooltipProvider>
      {recipe.sections.map((section, index) => (
        <section key={index}>
          {section.name && (
            <h2 className="text-2xl font-bold">{section.name}</h2>
          )}
          <StepsList recipe={recipe} section={section} />
        </section>
      ))}
    </TooltipProvider>
  );
};

export const StepsList = ({
  recipe,
  section,
}: {
  recipe: Recipe;
  section: Section;
}) => {
  return (
    <ol className="my-4 list-decimal pl-5 space-y-3">
      {section.content.map((content, index) =>
        content.type === "step" ? (
          <StepItem recipe={recipe} key={index} step={content} />
        ) : (
          <TextItem key={index} text={content} />
        ),
      )}
    </ol>
  );
};

export const StepItem = ({
  recipe,
  step,
}: {
  recipe: Recipe;
  step: Extract<Content, { type: "step" }>;
}) => {
  return (
    <li value={step.value.number}>
      {step.value.items.map((item, index) => (
        <StepSpan key={index} item={item} recipe={recipe} />
      ))}
    </li>
  );
};

export const TextItem = ({
  text,
}: {
  text: Extract<Content, { type: "text" }>;
}) => {
  return (
    <li className="list-none border-l-2 border-primary pl-2 -ml-2 text-gray-500">
      {text.value}
    </li>
  );
};

export const StepSpan = ({
  item,
  recipe,
}: {
  recipe: Recipe;
  item: Step["items"][number];
}) => {
  switch (item.type) {
    case "ingredient":
      const ingredientItem = recipe.ingredients[item.index];

      const ingredientLabel = ingredientItem.alias ?? ingredientItem.name;

      const getSourceIngredient = (ingredient: Ingredient) => {
        if (ingredient.modifiers !== "REF") return ingredient;
        if (ingredient.relation.type !== "reference") return ingredient;
        if (ingredient.relation.reference_target !== "ingredient")
          return ingredient;

        return recipe.ingredients[ingredient.relation.references_to];
      };

      const ingredient = getSourceIngredient(ingredientItem);

      const content = (
        <span className="text-green-700 transition-colors font-semibold hover:underline decoration-dotted underline-offset-4">
          {ingredientLabel}
        </span>
      );

      let toolTipContent = [];

      if (ingredient.quantity) {
        toolTipContent.push(
          <>
            <IngredientItem ingredient={ingredient} />
            {ingredient.note && ". " + ingredient.note}
          </>,
        );
      }

      if (
        ingredient.relation.type === "reference" &&
        ingredient.relation.reference_target === "step"
      ) {
        toolTipContent.push(`Se trin ${ingredient.relation.references_to + 1}`);
      }

      return toolTipContent.length > 0 ? (
        <Tooltip delayDuration={100}>
          <TooltipTrigger>{content}</TooltipTrigger>
          <TooltipContent>{toolTipContent}</TooltipContent>
        </Tooltip>
      ) : (
        content
      );

    case "inlineQuantity":
      const quantity = recipe.inline_quantities[item.index];

      return (
        <span className="text-orange-700 transition-colors font-semibold">
          {getQuantityString(quantity.unit, quantity.value)}
        </span>
      );

    case "text":
      return <span className="text-wrap break-words">{item.value}</span>;

    // TODO: Implement the rest of the cases
  }
};
