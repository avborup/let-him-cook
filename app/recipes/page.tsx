import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tables } from "@/database.types";
import { RecipeImage } from "@/components/recipe/recipe";

export default async function RecipePage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("recipes")
    .select()
    .order("created_at", { ascending: false });

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
      <a href={`/recipes/${recipe.slug}`}>
        <Card className="h-52 flex flex-row hover:bg-slate-50">
          {recipe.has_photo && (
            <div className="h-full min-w-52 w-52 relative overflow-hidden rounded-md">
              <RecipeImage id={recipe.id} />
            </div>
          )}
          <div className="flex flex-col p-3 leading-normal">
            <CardHeader className="pb-4">
              <CardTitle className="p-0">{recipe.name}</CardTitle>
            </CardHeader>
            {recipe.description && (
              <CardContent className="pb-4">
                <p className="text-sm text-gray-500 line-clamp-3">
                  {recipe.description}
                </p>
              </CardContent>
            )}
            <CardFooter>
              <div className="text-white bg-primary focus:ring-4 focus:ring-primary/30 font-medium rounded-md text-sm px-4 py-2 focus:outline-none">
                Se opskrift
              </div>
            </CardFooter>
          </div>
        </Card>
      </a>
    </li>
  );
};
