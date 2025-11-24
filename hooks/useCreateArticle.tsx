"use client";

import { useState } from "react";
import { ArticleInput } from "@/lib/ZodSchema";

interface UseCreateArticleReturn {
  createArticle: (data: ArticleInput & { image: File }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useCreateArticle(): UseCreateArticleReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createArticle = async (data: ArticleInput & { image: File }) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
  if (key !== "image") {
    if (typeof value === "number") {
      formData.append(key, value.toString());
    } else if (typeof value === "string") {
      formData.append(key, value);
    }
 
  }
});

      
      formData.append("image", data.image);

      const res = await fetch("http://localhost:3001/api/articles", {
        method: "POST",
        body: formData, // PAS DE headers !
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de la création.");
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(message);
      setLoading(false);
      throw new Error(message);
    }

    setLoading(false);
  };

  return { createArticle, loading, error };
}
