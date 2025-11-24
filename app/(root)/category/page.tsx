import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  name: string;
  slug: string;
  description?: string;
  articlesCount: number;
}

const categories: Category[] = [
  { name: "Laptops", slug: "laptops", articlesCount: 12 },
  { name: "Souris", slug: "souris", articlesCount: 8 },
  { name: "Imprimantes", slug: "imprimantes", articlesCount: 5 },
  { name: "Accessoires", slug: "accessoires", articlesCount: 20 },
];

const CategoriesPage = () => {
  return (
    <div className="min-h-screen w-full px-6 py-6 bg-background text-foreground">
      <div className="flex w-full justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Catégories</h1>
          <p className="text-sm text-muted-foreground">
            Découvrez les différentes catégories de produits et le nombre d’articles disponibles.
          </p>
        </div>
        <Link
          href="/categories/ajouter"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-colors"
        >
          Ajouter une catégorie
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            href={`/categories/${cat.slug}`}
            key={cat.slug}
            className="block rounded-xl bg-card border border-border p-4 hover:bg-white/5 transition-all"
          >
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-xl font-bold">{cat.name}</h2>
              <p className="text-sm text-muted-foreground">
                {cat.articlesCount} article{cat.articlesCount > 1 ? "s" : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
