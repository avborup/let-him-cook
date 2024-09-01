export { parseRecipe } from "./parser";

export type RecipeResult = {
  recipe: Recipe | null;
  report: string;
};

/** For now, the type definition is incomplete. There are more way more information in the actual parsed result. */
export type Recipe = {
  ingredients: Ingredient[];
  sections: Section[];
  inline_quantities: Quantity<Value>[];
  cookware: Cookware[];
  timers: Timer[];
};

export type Ingredient = {
  name: string;
  alias?: string;
  quantity?: Quantity<ScalableValue>;
  note?: string;
  modifiers: Modifier;
  relation: IngredientRelation;
};

export type Quantity<V> = {
  unit?: string;
  value: V;
};

export type ScalableValue = {
  type: "fixed" | "linear" | "byServings";
  value: Value;
};

export type Value =
  | { type: "text"; value: string }
  | { type: "number"; value: CooklangNumber }
  | { type: "range"; value: { start: CooklangNumber; end: CooklangNumber } };

export type CooklangNumber =
  | { type: "regular"; value: number }
  | { type: "fraction"; value: Fraction };

/**
 * A fractional number
 *
 * This is in the form of `[<whole>] <num>/<den>` and the total value is
 * `whole + err + num / den`.
 *
 * `err` exists to allow lossy conversions between a regular number and a
 * fraction.
 */
export type Fraction = {
  whole: number;
  num: number;
  den: number;
  err: number;
};

export type ComponentRelation =
  | { type: "definition"; defined_in_step: boolean; referenced_from: number[] }
  | {
      type: "reference";
      references_to: number;
    };

export type IngredientRelation = ComponentRelation & {
  reference_target?: "ingredient" | "step" | "section";
};

export type Section = {
  name?: string;
  content: Content[];
};

export type Content =
  | { type: "text"; value: string }
  | { type: "step"; value: Step };

export type Step = {
  number: number;
  items: StepItem[];
};

export type StepItem =
  | { type: "text"; value: string }
  | { type: "ingredient"; index: number }
  | { type: "cookware"; index: number }
  | { type: "timer"; index: number }
  | { type: "inlineQuantity"; index: number };

export type Modifier = "" | "RECIPE" | "HIDDEN" | "OPT" | "NEW" | "REF";

export type Cookware = {
  name: string;
  alias?: string;
  note?: string;
  quantity?: Value;
  relation: ComponentRelation;
  modifiers: Modifier;
};

export type Timer = {
  name?: string;
  quantity?: Quantity<ScalableValue | Value>;
};
