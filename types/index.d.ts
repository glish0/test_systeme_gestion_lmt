

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