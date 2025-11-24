import React from "react"
import Link from "next/link"
import Table from "@/components/sharedComponents/table/Table"


const suppliers = [
  {
    name: "Dell Inc.",
    email: "contact@dell.com",
    phone: "+1 800 624 9897",
    slug: "dell-inc",
    articlesCount: 12,
    categories: ["Laptop", "Accessoires", "Imprimantes"],
    image: "/images/dell-logo.jpg",
  },
  {
    name: "Logitech",
    email: "support@logitech.com",
    phone: "+1 646 454 3200",
    slug: "logitech",
    articlesCount: 8,
    categories: ["Souris", "Claviers", "Webcams"],
  },
  {
    name: "HP",
    email: "info@hp.com",
    phone: "+1 800 474 6836",
    slug: "hp",
    articlesCount: 5,
    categories: ["Imprimantes", "Ordinateurs portables"],
  },
]


const FournisseursPage = () => {
  return (
    <div className="w-full space-y-6 ">
      <div className="w-full flex justify-between items-center text-foreground">
        <div>
          <h1 className="text-2xl font-bold">Fournisseurs</h1>
          <p className="text-sm text-muted-foreground">
            Liste de tous les fournisseurs et nombre d’articles disponibles.
          </p>
        </div>
        <Link
          href="/fournisseurs/ajouter"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-colors"
        >
          Ajouter un fournisseur
        </Link>
      </div>

      <Table suppliers={suppliers} itemsPerPage={2} />
    </div>
  )
}

export default FournisseursPage
