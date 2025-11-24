import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IHistorique extends Document {
  article: mongoose.Types.ObjectId
  type: 'in' | 'out'
  quantity: number
  note?: string
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
}

const HistoriqueSchema: Schema<IHistorique> = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    type: { type: String, enum: ['in', 'out'], required: true },
    quantity: { type: Number, required: true },
    note: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

const StockHistory: Model<IHistorique> = mongoose.models.StockHistory || mongoose.model<IHistorique>('Historique', HistoriqueSchema)
export default StockHistory
