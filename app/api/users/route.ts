import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';




import { connectDB } from "@/lib/mongodb";
import User, { IUser } from "@/database/user.model";


interface CloudinaryUploadResult {
  secure_url: string;
}


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const userData = Object.fromEntries(
      Array.from(formData.entries()).map(([k, v]) => [k, v.toString()])
    )

    const { name, email, password, role } = userData;
console.log({ name, email, password, role });

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    if (role !== "admin" && role !== "employee") {
      return NextResponse.json(
        { message: "Rôle invalide" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined = undefined;
    const imageFile = formData.get("image");

    if (imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const upload: CloudinaryUploadResult = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "users" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as CloudinaryUploadResult);
            }
          ).end(buffer);
        }
      );

      imageUrl = upload.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      image: imageUrl,
    });

    const secret = process.env.JWT_SECRET!;
    if (!secret) {
      throw new Error("JWT_SECRET n'est pas défini dans les variables d'environnement !");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      secret,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        message: "Utilisateur créé avec succès",
        user,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Erreur interne lors de la création",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
