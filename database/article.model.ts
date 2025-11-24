import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IArticle extends Document {
  name: string
  image: string
  reference: string
  brand?: string
  category?: string
  price: number
  stock: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

const ArticleSchema: Schema<IArticle> = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    brand: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    description: { type: String },
  },
  {
    timestamps: true, // createdAt et updatedAt automatiquement
  }
)

// Vérifie si le modèle existe déjà pour éviter les erreurs lors du hot-reload
const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema)

export default Article
