import { Flame, TrendingUp, Clock } from 'lucide-react'

const weekData = [
  { day: 'Mon', hours: 7.2 }, { day: 'Tue', hours: 6.5 }, { day: 'Wed', hours: 8.0 },
  { day: 'Thu', hours: 7.8 }, { day: 'Fri', hours: 6.0 }, { day: 'Sat', hours: 8.5 }, { day: 'Sun', hours: 7.5 }
]
const maxH = Math.max(...weekData.map(d => d.hours))

export default function Tracker() {
  const avg = (weekData.reduce((s, d) => s + d.hours, 0) / 7).toFixed(1)

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Sleep Tracker</h1><p className="text-drift-muted text-sm">Your weekly sleep overview</p></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-drift-card rounded-2xl p-4 border border-purple-900/20 text-center">
          <Clock className="text-drift-accent mx-auto mb-1" size={18} />
          <p className="text-xl font-bold">{avg}h</p><p className="text-[10px] text-drift-muted">Avg Sleep</p>
        </div>
        <div className="bg-drift-card rounded-2xl p-4 border border-purple-900/20 text-center">
          <TrendingUp className="text-green-400 mx-auto mb-1" size={18} />
          <p className="text-xl font-bold">+12%</p><p className="text-[10px] text-drift-muted">vs Last Week</p>
        </div>
        <div className="bg-drift-card rounded-2xl p-4 border border-purple-900/20 text-center">
          <Flame className="text-orange-400 mx-auto mb-1" size={18} />
          <p className="text-xl font-bold">5</p><p className="text-[10px] text-drift-muted">Day Streak</p>
        </div>
      </div>
      <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
        <p className="text-sm font-medium mb-4">This Week</p>
        <div className="flex items-end justify-between gap-2 h-40">
          {weekData.map(({ day, hours }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-drift-muted">{hours}h</span>
              <div className="w-full rounded-t-lg bg-gradient-to-t from-drift-accent to-drift-glow transition-all" style={{ height: `${(hours / maxH) * 100}%` }} />
              <span className="text-[10px] text-drift-muted">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
