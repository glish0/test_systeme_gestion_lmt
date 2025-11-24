import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IFournisseurs extends Document {
  name: string
  email?: string
  phone?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}

const FournisseursSchema: Schema<IFournisseurs> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
)

const Fournisseurs: Model<IFournisseurs> = mongoose.models.Supplier || mongoose.model<IFournisseurs>('Fournisseurs', FournisseursSchema)
export default Fournisseurs
