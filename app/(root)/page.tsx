"use client";



import { Laptop, Users, Tag, Archive } from "lucide-react";
import CardStat from "@/components/sharedComponents/cards/StatCard";
import Chart from "@/components/sharedComponents/LineChart";
import HistoriqTable from "@/components/sharedComponents/table/HistoriqTable";


const DashboardPage = () => {
  const stockChartData = [
    { date: "01/11", Entrées: 15, Sorties: 5 },
    { date: "02/11", Entrées: 10, Sorties: 8 },
    { date: "03/11", Entrées: 20, Sorties: 12 },
    { date: "04/11", Entrées: 8, Sorties: 6 },
  ];

  const stockHistory: IHistorique[] = [
  {
    id: "1",
    article: "Laptop Dell XPS 15",
    type: "entrée", // ✔ doit être "entrée"
    quantity: 5,
    date: "2025-11-01",
    supplierOrDestination: "Dell Inc.",
  },
  {
    id: "2",
    article: "Souris Logitech MX3",
    type: "sortie", // ✔ doit être "sortie"
    quantity: 2,
    date: "2025-11-02",
    supplierOrDestination: "Client A",
  },
  {
    id: "3",
    article: "Imprimante HP 5200",
    type: "entrée", // ✔ doit être "entrée"
    quantity: 3,
    date: "2025-11-03",
    supplierOrDestination: "HP",
  },
];


  return (
    <div className="min-h-screen w-full px-6 py-6 bg-background text-foreground flex flex-col gap-6">
      {/* Cards statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardStat title="Total Articles" value={45} icon={<Laptop />} />
        <CardStat title="Fournisseurs" value={10} icon={<Users />} color="text-blue-400" />
        <CardStat title="Catégories" value={6} icon={<Tag />} color="text-yellow-400" />
        <CardStat title="Stock total" value={120} icon={<Archive />} color="text-green-400" />
      </div>

      {/* Chart */}
      <Chart data={stockChartData} />

      {/* Historique des mouvements */}
      <HistoriqTable movements={stockHistory} />
    </div>
  )
}

export default DashboardPage;
