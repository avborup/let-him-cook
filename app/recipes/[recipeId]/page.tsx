import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
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

export default async function RecipePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const supabase = createClient();
  const { data } = await supabase
    .from("recipes")
    .select()
    .eq("id", params.recipeId)
    .limit(1)
    .single();

  if (!data) {
    notFound();
  }

  return <RecipeView data={data} />;
}

export function RecipeView({ data }: { data: Tables<"recipes"> }) {
  const recipe = new Recipe(data.cooklang, {
    includeStepNumber: true,
    defaultIngredientAmount: "",
  });

  return (
    <>
      <RecipeBreadcrumb recipeName={data.name} />
      <Heading2 className="pt-4">Ingredienser</Heading2>
      <IngredientsList recipe={recipe} />
      <Heading2 className="pt-4">Fremgangsmåde</Heading2>
      <StepsList recipe={recipe} />
    </>
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
