import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Alert } from "@/components/ui/alert";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const message = encodeURIComponent(error.message);
      return redirect(`/login?message=${message}`);
    }

    return redirect("/");
  };

  return (
    <Card className="max-w-sm m-auto">
      <form>
        <CardHeader>
          <CardTitle className="text-2xl">Log ind</CardTitle>
          <CardDescription>
            Indtast din email nedenfor for at logge ind.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="geralt@kaermorhen.wtch"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
          {searchParams?.message && (
            <Alert variant="destructive">{searchParams.message}</Alert>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton
            formAction={signIn}
            pendingText="Signing In..."
            className="w-full"
          >
            Log ind
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
