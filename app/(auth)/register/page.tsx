"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, registerSchema } from "@/lib/ZodSchema";


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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegister } from "@/hooks/useRegister";
import { useAuth } from "@/contexts/useAuth";
import { useRouter } from "next/navigation";

const Register = () => {
  const { setAuth } = useAuth();
  const { registerUser } = useRegister();
  const route = useRouter()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  });



const onSubmit = async (data: RegisterForm) => {

  const res = await registerUser(data);
 
   if (res) {
    setAuth(res.user, res.token);
    route.push('/')
  }

};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>Enregistrez un nouvel utilisateur</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" {...register("name")} placeholder="John Doe" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Role */}
            <div className="flex flex-col space-y-1">
              <Label>Rôle</Label>
              <Select
                onValueChange={(value: RegisterForm["role"]) =>
                  setValue("role", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="employee">Employé</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              S&apos;enregistrer
            </Button>

           
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
