interface CardStatProps {
  title: string
  value: number | string
  icon?: React.ReactNode
  color?: string
}

const CardStat: React.FC<CardStatProps> = ({ title, value, icon, color = "text-white" }) => {
  return (
    <div className="bg-card border border-border p-4 rounded-xl flex flex-col items-start gap-2 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-center gap-2">
        {icon && <div className="text-2xl">{icon}</div>}
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

export default CardStat
