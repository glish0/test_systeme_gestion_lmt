import CardArticle from "@/components/sharedComponents/cards/CardArticle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const articles: IArticle[] = [
  {
    name: "Laptop Dell XPS 15",
    image:
      "https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "dell-xps-15",
    price: 1599.99,
    stock: 12,
    brand: "Dell",
  },
  {
    name: "Souris Logitech MX Master 3",
    image:
      "https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "logitech-mx3",
    price: 99.99,
    stock: 0,
    brand: "Logitech",
  },
];

const Arcticle = () => {
  return (
    <div className="space-y-6">
      {/* Titre et description */}
      <div className="text-foreground w-full flex flex-row items-center justify-between">
        <div className="">
           <h1 className="text-2xl font-bold">Articles en stock</h1>
            <p className="text-sm text-muted-foreground">
              Retrouvez ici tous les produits informatiques disponibles dans notre
              inventaire.
            </p>
        </div>
         <Button variant="outline">Button</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((item) => (
          <Link
            href={`/articles/${item.slug}`}
            key={item.slug}
            className="group block rounded-xl overflow-hidden bg-card border border-border hover:bg-white/5 transition-all"
          >
            <CardArticle {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Arcticle;
