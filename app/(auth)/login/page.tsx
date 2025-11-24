"use client";


import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Checkbox } from "@/components/ui/checkbox";
import { LoginForm, loginSchema,  } from "@/lib/ZodSchema";




const Login = () => {


  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: LoginForm) => {
 console.log('data', data)
 console.log('connected')


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
              <Input id="email" type="email" {...register("email")} placeholder="exemple@entreprise.com" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" {...register("password")} placeholder="Votre mot de passe" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox {...register("remember")} id="remember" />
                <Label htmlFor="remember">Se souvenir de moi</Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            

            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>

          <p className="text-sm mt-4 text-center text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-blue-400 hover:underline font-medium">
              S&apos;inscrire
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
