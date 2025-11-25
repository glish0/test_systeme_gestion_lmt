// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/database/user.model";


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    console.log("DB connectée");

    
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET non défini dans les variables d'environnement !");

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      secret,
      { expiresIn: "7d" }
    );

    // Retourne l'utilisateur et le token
    return NextResponse.json(
      { message: "Connexion réussie", user, token },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Erreur login:", err);
    return NextResponse.json(
      {
        message: "Erreur serveur",
        error: err instanceof Error ? err.message : "Erreur inconnue"
      },
      { status: 500 }
    );
  }
}
