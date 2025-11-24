'use client'

import Link from "next/link"
import Image from "next/image"
import React, { useState } from "react"

interface Supplier {
  name: string
  image?: string
  email?: string
  phone?: string
  slug: string
  articlesCount?: number
  categories?: string[] // <-- Nouvelle propriété
}

interface SupplierTableProps {
  suppliers: Supplier[]
  itemsPerPage?: number
}

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(suppliers.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSuppliers = suppliers.slice(startIndex, endIndex)

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border text-foreground bg-card">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Logo</th>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Téléphone</th>
              <th className="p-3 text-left">Articles</th>
              <th className="p-3 text-left">Catégories</th> {/* Nouvelle colonne */}
              <th className="p-3 text-left">Lien</th>
            </tr>
          </thead>
          <tbody>
            {currentSuppliers.map((supplier) => (
              <tr key={supplier.slug} className="border-t border-border hover:bg-white/5 transition-all">
                <td className="p-3">
                  {supplier.image ? (
                    <Image
                      src={supplier.image}
                      alt={supplier.name}
                      width={60}
                      height={60}
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-sm">
                      {supplier.name[0]}
                    </div>
                  )}
                </td>
                <td className="p-3">{supplier.name}</td>
                <td className="p-3">{supplier.email || "-"}</td>
                <td className="p-3">{supplier.phone || "-"}</td>
                <td className="p-3 font-medium">{supplier.articlesCount || 0}</td>
                <td className="p-3">
                  {supplier.categories && supplier.categories.length > 0
                    ? supplier.categories.join(", ")
                    : "-"}
                </td>
                <td className="p-3">
                  <Link
                    href={`/fournisseurs/${supplier.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="px-3 py-1">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  )
}

export default SupplierTable
