import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IngredientItem, getQuantityString } from "./ingredients";
import {
  Content,
  Ingredient,
  Recipe,
  Section,
  Step,
} from "@/lib/recipeBindings";
import { isScalableValue } from "@/lib/recipeBindings/typeUtils";

export const StepSections = ({
  recipe,
  isMobile,
}: {
  recipe: Recipe;
  isMobile: boolean;
}) => {
  return (
    <TooltipProvider>
      {recipe.sections.map((section, index) => (
        <section key={index}>
          {section.name && (
            <h2 className="text-2xl font-bold">{section.name}</h2>
          )}
          <StepsList recipe={recipe} section={section} isMobile={isMobile} />
        </section>
      ))}
    </TooltipProvider>
  );
};

export const StepsList = ({
  recipe,
  section,
  isMobile,
}: {
  recipe: Recipe;
  section: Section;
  isMobile: boolean;
}) => {
  return (
    <ol className="my-4 list-decimal pl-5 space-y-3">
      {section.content.map((content, index) =>
        content.type === "step" ? (
          <StepItem
            recipe={recipe}
            key={index}
            step={content}
            isMobile={isMobile}
          />
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
  isMobile,
}: {
  recipe: Recipe;
  step: Extract<Content, { type: "step" }>;
  isMobile: boolean;
}) => {
  return (
    <li value={step.value.number}>
      {step.value.items.map((item, index) => (
        <StepSpan key={index} item={item} recipe={recipe} isMobile={isMobile} />
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
  isMobile,
}: {
  recipe: Recipe;
  item: Step["items"][number];
  isMobile: boolean;
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

      if (ingredient.modifiers === "OPT") {
        toolTipContent.push("Valgfri ingrediens");
      }

      if (
        ingredient.relation.type === "reference" &&
        ingredient.relation.reference_target === "step"
      ) {
        toolTipContent.push(`Se trin ${ingredient.relation.references_to + 1}`);
      }

      return toolTipContent.length > 0 ? (
        isMobile ? (
          <Popover>
            <PopoverTrigger>{content}</PopoverTrigger>
            <PopoverContent>{toolTipContent}</PopoverContent>
          </Popover>
        ) : (
          <Tooltip delayDuration={100}>
            <TooltipTrigger>{content}</TooltipTrigger>
            <TooltipContent>{toolTipContent}</TooltipContent>
          </Tooltip>
        )
      ) : (
        content
      );

    case "inlineQuantity":
      const quantity = recipe.inline_quantities[item.index];

      return <span>{getQuantityString(quantity.unit, quantity.value)}</span>;

    case "text":
      return <span className="text-wrap break-words">{item.value}</span>;

    case "cookware":
      const cookware = recipe.cookware[item.index];

      return <span>{cookware.name}</span>;

    case "timer":
      const timer = recipe.timers[item.index];

      return (
        <span>
          {timer.quantity
            ? getQuantityString(
                timer.quantity.unit,
                isScalableValue(timer.quantity.value)
                  ? timer.quantity.value.value
                  : timer.quantity.value,
              )
            : timer.name}
        </span>
      );

    default:
      return (
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <span className="text-red-700 transition-colors font-semibold">
              ??
            </span>
          </TooltipTrigger>
          <TooltipContent>
            Manglende håndtering af opskrift-funktion.
            <pre>
              <code>{JSON.stringify(item, null, 2)}</code>
            </pre>
          </TooltipContent>
        </Tooltip>
      );
  }
};
