import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IngredientItem, getQuantityString } from "./ingredients";
import { Content, Recipe, Section, Step } from "@/lib/recipeBindings";

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
      {section.content.map((step, index) => (
        <StepItem recipe={recipe} key={index} step={step} />
      ))}
    </ol>
  );
};

export const StepItem = ({
  recipe,
  step,
}: {
  recipe: Recipe;
  step: Content;
}) => {
  return (
    <li>
      {step.type === "text"
        ? step.value
        : step.value.items.map((item, index) => (
            <StepSpan key={index} item={item} recipe={recipe} />
          ))}
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
      const ingredient = recipe.ingredients[item.index];

      const content = (
        <span className="text-green-700 transition-colors font-semibold hover:underline decoration-dotted underline-offset-4">
          {ingredient.name}
        </span>
      );

      return ingredient.quantity ? (
        <Tooltip delayDuration={100}>
          <TooltipTrigger>{content}</TooltipTrigger>
          <TooltipContent>
            <IngredientItem ingredient={ingredient} />
          </TooltipContent>
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
