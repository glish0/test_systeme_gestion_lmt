

interface IArticle {
  name: string
  image: string
  slug: string
  price: number
  stock: number
  brand?: string
}

interface IHistorique {
  id: string
  article: string
  type: "entrée" | "sortie"
  quantity: number
  date: string
  supplierOrDestination?: string
}

interface CardArticleProps {
  _id: string;
  name: string;
  image: string;
  reference: string;
  brand?: string;
  category?: string;
  price: number;
  stock: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}


