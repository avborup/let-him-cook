import { Recipe } from "@cooklang/cooklang-ts";
import { Heading2 } from "@/components/typography/h2";
import { IngredientsList } from "@/components/recipe/ingredients";
import { StepsList } from "@/components/recipe/steps";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tables } from "@/database.types";

export function RecipeView({ data }: { data: Omit<Tables<"recipes">, "id"> }) {
  const recipe = new Recipe(data.cooklang, {
    includeStepNumber: true,
    defaultIngredientAmount: "",
  });

  return (
    <div className="max-w-2xl">
      <RecipeBreadcrumb recipeName={data.name} />
      <Heading2 className="pt-4">Ingredienser</Heading2>
      <IngredientsList recipe={recipe} />
      <Heading2 className="pt-4">Fremgangsmåde</Heading2>
      <StepsList recipe={recipe} />
    </div>
  );
}

const RecipeBreadcrumb = ({ recipeName }: { recipeName: string }) => {
  return (
    <Breadcrumb className="pb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/recipes">Opskrifter</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{recipeName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
