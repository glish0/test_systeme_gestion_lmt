'use client'

import CardArticle from "@/components/sharedComponents/cards/CardArticle";
import AddArticleForm from "@/components/sharedComponents/forms/AddArticleForm";
import { useArticles } from "@/hooks/useArticle";
import Link from "next/link";
import { useAuth } from "@/contexts/useAuth";

const Article = () => {
  const { articles, loading, error } = useArticles();
  const { user } = useAuth(); // récupère l'utilisateur connecté

  console.log('articles', articles);

  // mettre un skeleton
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="space-y-6">
      {/* Titre et description */}
      <div className="text-foreground w-full flex flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Articles en stock</h1>
          <p className="text-sm text-muted-foreground">
            Retrouvez ici tous les produits informatiques disponibles dans notre inventaire.
          </p>
        </div>

        {/* Afficher le formulaire seulement si l'utilisateur est admin */}
        {user?.role === "admin" && <AddArticleForm />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles?.map((item) => (
          <Link
            href={`/articles/${item.name}`}
            key={item._id}
            className="group block rounded-xl overflow-hidden bg-card border border-border hover:bg-white/5 transition-all"
          >
            <CardArticle {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Article;
