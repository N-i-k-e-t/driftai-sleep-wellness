import { useState, useEffect } from 'react'
import { Moon, Sun, CloudMoon } from 'lucide-react'
import { supabase } from '../lib/supabase'

const moods = ['😴', '😐', '🙂', '😊', '🤩']
const tips = ['Try dimming screens 1hr before bed', 'A cool room (18-20C) promotes better sleep', 'Consistent sleep schedule boosts quality', 'Deep breathing can help you fall asleep faster']

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [sleepScore, setSleepScore] = useState<number | null>(null)
  const [hasLogs, setHasLogs] = useState(false)
  const tip = tips[Math.floor(Math.random() * tips.length)]

  useEffect(() => {
    checkLogs()
  }, [])

  const checkLogs = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('sleep_logs').select('quality').eq('user_id', user.id).limit(1)
    if (data && data.length > 0) {
      setHasLogs(true)
      const avg = data.reduce((s: number, d: any) => s + (d.quality || 3), 0) / data.length
      setSleepScore(Math.round(avg * 20))
    }
  }

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">{greeting()}</h1><p className="text-drift-muted text-sm">How are you feeling?</p></div>
        <CloudMoon className="text-drift-accent" size={28} />
      </div>
      <div className="bg-gradient-to-br from-drift-accent/20 to-purple-900/20 rounded-2xl p-6 border border-purple-900/20 text-center">
        <p className="text-drift-muted text-sm mb-2">Sleep Score</p>
        <p className="text-5xl font-bold text-drift-accent">{sleepScore !== null ? sleepScore : '--'}</p>
        <p className="text-drift-muted text-xs mt-1">{hasLogs ? 'out of 100' : 'Log your first night to see your score'}</p>
      </div>
      <div className="bg-drift-card rounded-2xl p-4 border border-purple-900/20">
        <p className="text-sm font-medium mb-3">How do you feel today?</p>
        <div className="flex justify-around">
          {moods.map((m, i) => (
            <button key={i} onClick={() => setSelectedMood(i)} className={`text-2xl p-2 rounded-xl transition-all ${selectedMood === i ? 'bg-drift-accent/20 scale-110' : 'hover:bg-drift-bg'}`}>{m}</button>
          ))}
        </div>
      </div>
      <div className="bg-drift-card rounded-2xl p-4 border border-purple-900/20">
        <div className="flex items-start gap-3">
          <Sun className="text-yellow-400 mt-0.5" size={18} />
          <div><p className="text-sm font-medium">Daily Tip</p><p className="text-xs text-drift-muted mt-1">{tip}</p></div>
        </div>
      </div>
      <div className="bg-drift-card rounded-2xl p-4 border border-purple-900/20">
        <p className="text-sm font-medium mb-3">Quick Log</p>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs text-drift-muted">Bedtime</label><input type="time" className="w-full bg-drift-bg border border-purple-900/20 rounded-lg px-3 py-2 text-sm mt-1" /></div>
          <div><label className="text-xs text-drift-muted">Wake up</label><input type="time" className="w-full bg-drift-bg border border-purple-900/20 rounded-lg px-3 py-2 text-sm mt-1" /></div>
        </div>
        <div className="mt-3"><label className="text-xs text-drift-muted">Quality (1-5)</label>
          <div className="flex gap-2 mt-1">{[1,2,3,4,5].map(n => (
            <button key={n} className="flex-1 bg-drift-bg border border-purple-900/20 rounded-lg py-2 text-sm hover:bg-drift-accent/20 transition">{n}</button>
          ))}</div>
        </div>
        <button className="w-full mt-3 bg-drift-accent hover:bg-purple-600 text-white font-semibold py-2 rounded-xl transition">Save Log</button>
      </div>
    </div>
  )
}
