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

  const recipe = new Recipe(data.cooklang, {
    includeStepNumber: true,
    defaultIngredientAmount: "",
  });

  console.log(JSON.stringify(recipe, null, 2));

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
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/recipes">Recipes</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{recipeName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
