import z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  remember: z.boolean(),
});

export type LoginForm = z.infer<typeof loginSchema>;


export const articleSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
image: z
  .instanceof(File, { message: "L'image est obligatoire" })
  .refine((file) => file.size > 0, "Le fichier est invalide"),
  reference: z.string().min(1, "La référence est requise"),
  brand: z.string().optional(),
  category: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  description: z.string().optional(),
});

export type ArticleInput = z.infer<typeof articleSchema>;



export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(["admin", "employee"], {
    message: "Veuillez sélectionner un rôle",
  }),
});

export type RegisterForm = z.infer<typeof registerSchema>;