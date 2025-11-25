"use client";

import { useState, useEffect } from "react";

export interface Article {
  _id: string;
  name: string;
  image: string;
  reference: string;
  brand?: string;
  category?: string;
  price: number;
  stock: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;

}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export function useArticles(): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/articles`);
      console.log('response', response)
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de la récupération des articles");
      }

      const { articles } = await response.json();
      console.log('article cv', articles)
      setArticles(articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error };
}
