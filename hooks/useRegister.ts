import { useState } from "react";
import { RegisterForm } from "@/lib/ZodSchema";
import { AuthUser } from "@/contexts/useAuth";


interface RegisterResponse {
  user: AuthUser;
  token: string;
  message: string;
}

interface UseRegisterReturn {
  registerUser: (data: RegisterForm) => Promise<RegisterResponse | null>;
  loading: boolean;
  error: string | null;
}

export const useRegister = (): UseRegisterReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (data: RegisterForm): Promise<RegisterResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      console.log(data);
      console.log(JSON.stringify(data))

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value);
      });


      const res = await fetch("/api/users", { method: "POST", body: formData });
      const json = await res.json() as RegisterResponse & { message: string };

      if (!res.ok) throw new Error(json.message);

      return { user: json.user, token: json.token, message: json.message };
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};
