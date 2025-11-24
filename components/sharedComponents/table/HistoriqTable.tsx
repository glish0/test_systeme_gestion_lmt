
type props = {
  movements: IHistorique[]
}

const HistoriqTable  = ({ movements }: props) => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-md">
      <h2 className="text-lg font-semibold mb-4">Historique des mouvements de stock</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border text-foreground">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Article</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Quantité</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Fournisseur / Destination</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((item) => (
              <tr key={item.id} className="border-t border-border hover:bg-white/5 transition-all">
                <td className="p-3">{item.article}</td>
                <td className={`p-3 font-medium ${item.type === "entrée" ? "text-green-400" : "text-red-500"}`}>
                  {item.type}
                </td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.supplierOrDestination || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoriqTable
