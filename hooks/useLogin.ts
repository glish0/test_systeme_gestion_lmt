import { AuthUser } from "@/contexts/useAuth";
import { useState } from "react";


interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  user: AuthUser;
  token: string;
  message: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (data: LoginForm): Promise<LoginResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const json = (await res.json()) as LoginResponse;

      if (!res.ok) throw new Error(json.message);

      return json;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
