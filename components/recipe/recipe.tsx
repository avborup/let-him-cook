import Image from "next/image";
import { Heading2 } from "@/components/typography/h2";
import { IngredientsList } from "@/components/recipe/ingredients";
import { StepSections } from "@/components/recipe/steps";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { WasmModule } from "@/lib/wasm";
import { parseRecipe } from "@/lib/recipeBindings";

export type RecipeViewProps = {
  data: Omit<Tables<"recipes">, "id" | "has_photo" | "slug"> & {
    id?: string;
    has_photo?: boolean;
  };
};

export type InternalRecipeViewProps = RecipeViewProps & {
  wasm: WasmModule;
};

export function RecipeView({ data, wasm }: InternalRecipeViewProps) {
  const result = parseRecipe(wasm, data.cooklang);

  console.log(JSON.stringify(result.recipe, null, 2));

  if (!result.recipe) {
    console.error("Recipe parse report:", result.report);
    return (
      <>
        <p>Opskriften kunne ikke læses. Årsag:</p>
        <pre className="text-red-700">
          <code>{result.report}</code>
        </pre>
      </>
    );
  }

  return (
    <div className="max-w-2xl">
      <RecipeBreadcrumb recipeName={data.name} />
      {data.has_photo && data.id && (
        <div className="h-72 w-full relative overflow-hidden rounded-md">
          <RecipeImage id={data.id} />
        </div>
      )}
      {data.description && (
        <p className="pt-4 whitespace-pre-wrap">{data.description}</p>
      )}
      <Heading2 className="pt-4">Ingredienser</Heading2>
      <IngredientsList recipe={result.recipe} />
      <Heading2 className="pt-4">Fremgangsmåde</Heading2>
      <StepSections recipe={result.recipe} />
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

export const RecipeImage = ({ id }: { id: string }) => {
  const supabase = createClient();
  const imageUrl = supabase.storage.from("recipePhotos").getPublicUrl(id)
    .data.publicUrl;

  return (
    <Image
      src={imageUrl}
      alt="Picture of the recipe"
      layout="fill"
      className="object-cover"
    />
  );
};
