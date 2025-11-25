import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
