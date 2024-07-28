import { Recipe, Step } from "@cooklang/cooklang-ts";

export const StepsList = ({ recipe }: { recipe: Recipe }) => {
  return (
    <ul className="my-4 list-disc pl-5 space-y-3">
      {recipe.steps.map((step, index) => (
        <StepItem key={index} step={step} />
      ))}
    </ul>
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
      return (
        <span className="text-green-700 transition-colors font-semibold">
          {item.name}
        </span>
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
