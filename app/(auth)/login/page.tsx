"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginSchema } from "@/lib/ZodSchema";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/contexts/useAuth";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const Login = () => {
  const { loginUser, loading, error } = useLogin();
  const { setAuth } = useAuth();
  const route = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: LoginForm) => {
    const res = await loginUser(data);
    if (res) {
      setAuth(res.user, res.token); 
      route.push('/')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Connectez-vous pour gérer vos articles et le stock
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="exemple@entreprise.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Votre mot de passe"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              
              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
