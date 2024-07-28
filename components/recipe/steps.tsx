import { Recipe, Step } from "@cooklang/cooklang-ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IngredientItem } from "./ingredients";

export const StepsList = ({ recipe }: { recipe: Recipe }) => {
  return (
    <TooltipProvider>
      <ol className="my-4 list-decimal pl-5 space-y-3">
        {recipe.steps.map((step, index) => (
          <StepItem key={index} step={step} />
        ))}
      </ol>
    </TooltipProvider>
  );
};

export const StepItem = ({ step }: { step: Step }) => {
  return (
    <li>
      {step.map((item, index) => (
        <StepSpan key={index} item={item} />
      ))}
    </li>
  );
};

export const StepSpan = ({ item }: { item: Step[number] }) => {
  switch (item.type) {
    case "ingredient":
      const content = (
        <span className="text-green-700 transition-colors font-semibold hover:underline decoration-dotted underline-offset-4">
          {item.name}
        </span>
      );

      return item.quantity !== "" ? (
        <Tooltip delayDuration={100}>
          <TooltipTrigger>{content}</TooltipTrigger>
          <TooltipContent>
            <IngredientItem ingredient={item} />
          </TooltipContent>
        </Tooltip>
      ) : (
        content
      );
    case "cookware":
      return (
        <span>
          {item.quantity} {item.name}
        </span>
      );
    case "timer":
      return (
        <span>
          {item.quantity} {item.units}
        </span>
      );
    case "text":
      return <span>{item.value}</span>;
  }
};
