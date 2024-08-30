import Image from "next/image";
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
import { createClient } from "@/utils/supabase/client";
import { WasmModule } from "@/lib/wasm";

export type RecipeViewProps = {
  data: Omit<Tables<"recipes">, "id" | "has_photo"> & {
    id?: string;
    has_photo?: boolean;
  };
};

export type InternalRecipeViewProps = RecipeViewProps & {
  wasm: WasmModule;
};

export function RecipeView({ data, wasm }: InternalRecipeViewProps) {
  const recipe = new Recipe(data.cooklang, {
    includeStepNumber: true,
    defaultIngredientAmount: "",
  });

  console.log("Result", wasm.add(1, 2));

  return (
    <div className="max-w-2xl">
      <RecipeBreadcrumb recipeName={data.name} />
      {data.has_photo && data.id && <RecipeImage id={data.id} />}
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

const RecipeImage = ({ id }: { id: string }) => {
  const supabase = createClient();
  const imageUrl = supabase.storage.from("recipePhotos").getPublicUrl(id)
    .data.publicUrl;

  return (
    <div className="h-72 w-full relative overflow-hidden rounded-md">
      <Image
        src={imageUrl}
        alt="Picture of the recipe"
        layout="fill"
        className="object-cover"
      />
    </div>
  );
};
