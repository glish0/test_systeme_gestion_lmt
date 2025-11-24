"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
;
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArticleInput, articleSchema } from "@/lib/ZodSchema";
import { useCreateArticle } from "@/hooks/useCreateArticle";
import { toast } from "sonner";

export default function AddArticleForm() {
   const { createArticle, loading } = useCreateArticle();

  const form = useForm<ArticleInput>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      name: "",
      image: undefined,
      reference: "",
      brand: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  const onSubmit = async (values: ArticleInput) => {
  try {
    console.log('values', values)
    await createArticle({
  ...values,
  image: values.image,
  price: Number(values.price),
  stock: Number(values.stock),
});


       toast.success(`L'article "${values.name}" a été ajouté avec succès !`);

    form.reset();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Une erreur est survenue !";
    toast.error(message);
  }
};


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Ajouter un article</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] h-[400px] overflow-auto p-4">
              <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Image</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            field.onChange(file);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Référence</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
  control={form.control}
  name="price"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Prix</FormLabel>
      <FormControl>
        <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          <FormField
  control={form.control}
  name="stock"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Stock</FormLabel>
      <FormControl>
        <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Création..." : "Créer l'article"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
