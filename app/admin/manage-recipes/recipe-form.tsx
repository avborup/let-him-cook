"use client";

import { RecipeView } from "@/components/recipe/recipe";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Opskrifttitel er påkrævet",
  }),
  cooklang: z.string().trim().min(1, {
    message: "Opskrift-indhold er påkrævet",
  }),
});

export function RecipeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn på opskrift</FormLabel>
              <FormControl>
                <Input placeholder={EXAMPLE_RECIPE_NAME} {...field} />
              </FormControl>
              <FormDescription>
                Titlen bør være beskrivende men bør også være gribende og få
                maden til at lyde lækker!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cooklang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opskriftens indhold</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={EXAMPLE_RECIPE_TEXT}
                  className="resize-none font-mono text-sm h-96"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Indtast opskriften her. Brug{" "}
                <Link
                  href="https://cooklang.org/docs/spec/"
                  className="underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Cooklang-formatet
                </Link>{" "}
                til at definere opskriften.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full"
                type="button"
                disabled={!form.formState.isValid}
              >
                Forhåndsvis opskrift
              </Button>
            </DialogTrigger>
            <DialogContent>
              <RecipeView
                data={{
                  name: form.watch("name"),
                  cooklang: form.watch("cooklang"),
                  created_at: new Date().toISOString(),
                }}
              />
            </DialogContent>
          </Dialog>
          <Button type="submit" className="w-full">
            Gem
          </Button>
        </div>
      </form>
    </Form>
  );
}

const EXAMPLE_RECIPE_NAME = "Sprøde kartofler og kødtern i cremet svampesovs";

const EXAMPLE_RECIPE_TEXT = `Skær @oksekød{} i tern. Krydr med salt og peber, og steg dem sprøde med god stegeskorpe. Læg kødet til side. Skær @kartofler{} i tern af ca. 1-2cm. Steg kartoflerne i samme pande som kødet over høj varme, til de er sprøde og gyldne. Gør det i evt. flere omgange for at give kartoflerne mere plads i panden for at få max sprødhed. Læg kartoflerne til side med kødet.

Hak @løg{}, @hvidløg{} og @svampe{} (valgfrie sorter - fx champignoner, Karl Johan eller andre.) og sauter det i panden.

Tilsæt en smule @oksebouillon{en smule} og evt. @Noilly Prat{} for at få noget væske til at opsamle stegeskorpen fra panden. Tilsæt @skyr{} og rør rundt, til det er en jævn sovs. Riv @parmesan{} i sovsen og justér evt. viskositeten med mere bouillon. Smag til med @røget paprika{}, @frisk timian{}, @hvidløgspulver{}, @salt{} og @peber{}.

Tip: skyr og yogurt kan skille, hvis det bliver for varmt. Sørg for at sovsen ikke koger, når du tilsætter skyr.`;
