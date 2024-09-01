import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database.types";
import { RecipeImage } from "@/components/recipe/recipe";

export default async function RecipePage() {
  const supabase = createClient();
  const { data } = await supabase.from("recipes").select();

  if (!data) {
    notFound();
  }

  return (
    <>
      <ul className="grid gap-4">
        {data.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </>
  );
}

const RecipeCard = ({ recipe }: { recipe: Tables<"recipes"> }) => {
  return (
    <li>
      <Card className="h-44 flex flex-row">
        {recipe.has_photo && (
          <div className="h-full w-48 relative overflow-hidden rounded-md">
            <RecipeImage id={recipe.id} />
          </div>
        )}
        <div className="flex flex-col justify-between p-4 leading-normal">
          <CardHeader>
            <CardTitle>{recipe.name}</CardTitle>
          </CardHeader>
          <CardFooter>
            <a
              href={`/recipes/${recipe.slug}`}
              className="text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:ring-primary/30 font-medium rounded-md text-sm px-5 py-2.5 focus:outline-none"
            >
              Se opskrift
            </a>
          </CardFooter>
        </div>
      </Card>
    </li>
  );
};
