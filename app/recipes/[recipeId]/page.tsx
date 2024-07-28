import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

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

  console.log(data);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
