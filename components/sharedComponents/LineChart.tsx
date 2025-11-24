"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface StockChartProps {
  data: { date: string; Entrées: number; Sorties: number }[]
}

const Chart: React.FC<StockChartProps> = ({ data }) => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-md">
      <h2 className="text-lg font-semibold mb-4">Entrées et Sorties de stock (dernière semaine)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "none", color: "#fff" }}
          />
          <Line type="monotone" dataKey="Entrées" stroke="#22c55e" strokeWidth={2} />
          <Line type="monotone" dataKey="Sorties" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
