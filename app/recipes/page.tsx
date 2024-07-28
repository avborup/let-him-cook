import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database.types";

export default async function RecipePage() {
  const supabase = createClient();
  const { data } = await supabase.from("recipes").select();

  if (!data) {
    notFound();
  }

  console.log(JSON.stringify(data, null, 2));

  return (
    <>
      <ul>
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
      <Card>
        <CardHeader>
          <CardTitle>{recipe.name}</CardTitle>
        </CardHeader>
        <CardFooter>
          <a
            href={`/recipes/${recipe.id}`}
            className="text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:ring-primary/30 font-medium rounded-md text-sm px-5 py-2.5 focus:outline-none"
          >
            Se opskrift
          </a>
        </CardFooter>
      </Card>
    </li>
  );
};
