import Image from "next/image"

interface CardArticleProps {
  name: string
  image: string
  slug: string
  price: number
  stock: number
  brand?: string
  reference?: string
  category?: string
  updatedAt?: string
}

const CardArticle = ({
  name,
  image,
  slug,
  price,
  stock,
  brand,
  reference,
  category,
  updatedAt,
}: CardArticleProps) => {
  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Image */}
      <div className="w-full h-48 relative rounded overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Infos principales */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        {brand && <p className="text-sm text-muted-foreground">Marque: {brand}</p>}
        {category && <p className="text-sm text-muted-foreground">Catégorie: {category}</p>}
        {reference && <p className="text-sm text-muted-foreground">Réf: {reference}</p>}
      </div>

      {/* Prix et Stock */}
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold text-foreground">${price.toFixed(2)}</span>
        <span
          className={`text-sm font-medium ${
            stock > 5 ? "text-green-400" : stock > 0 ? "text-yellow-400" : "text-red-500"
          }`}
        >
          {stock > 0 ? `${stock} en stock` : "Rupture"}
        </span>
      </div>

      {/* Date mise à jour */}
      {updatedAt && (
        <p className="text-xs text-muted-foreground mt-1">
          Mis à jour: {updatedAt}
        </p>
      )}
    </div>
  )
}

export default CardArticle
