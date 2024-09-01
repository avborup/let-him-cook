import { ScalableValue, Value } from ".";

export const isScalableValue = (
  value: ScalableValue | Value,
): value is ScalableValue => {
  return (
    value.type === "fixed" ||
    value.type === "linear" ||
    value.type === "byServings"
  );
};
