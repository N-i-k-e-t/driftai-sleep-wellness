import { useState, useEffect } from 'react'
import { Moon, Sun, CloudMoon, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'

const moods = ['😴', '😐', '🙂', '😊', '🤩']
const tips = ['Try dimming screens 1hr before bed', 'A cool room (18-20C) promotes better sleep', 'Consistent sleep schedule boosts quality', 'Deep breathing can help you fall asleep faster']

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [sleepScore, setSleepScore] = useState<number | null>(null)
  const [hasLogs, setHasLogs] = useState(false)
  const [bedtime, setBedtime] = useState('')
  const [wakeTime, setWakeTime] = useState('')
  const [quality, setQuality] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
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

  const handleSaveLog = async () => {
    if (!bedtime || !wakeTime || !quality) {
      setError('Please fill bedtime, wake time and quality')
      return
    }
    setSaving(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')

      const today = new Date().toISOString().split('T')[0]

      // Check if log exists for today
      const { data: existing } = await supabase
        .from('sleep_logs')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', today + 'T00:00:00')
        .lte('created_at', today + 'T23:59:59')
        .limit(1)

      if (existing && existing.length > 0) {
        // Update existing
        await supabase.from('sleep_logs').update({
          bedtime, wake_time: wakeTime, quality, mood: selectedMood,
          updated_at: new Date().toISOString()
        }).eq('id', existing[0].id)
      } else {
        // Insert new
        await supabase.from('sleep_logs').insert({
          user_id: user.id, bedtime, wake_time: wakeTime, quality, mood: selectedMood,
          created_at: new Date().toISOString()
        })
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      checkLogs()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
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
        {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
        {saved && <div className="flex items-center gap-2 text-green-400 text-xs mb-2"><Check size={14} />Sleep log saved successfully!</div>}
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs text-drift-muted">Bedtime</label><input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)} className="w-full bg-drift-bg border border-purple-900/20 rounded-lg px-3 py-2 text-sm mt-1" /></div>
          <div><label className="text-xs text-drift-muted">Wake up</label><input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} className="w-full bg-drift-bg border border-purple-900/20 rounded-lg px-3 py-2 text-sm mt-1" /></div>
        </div>
        <div className="mt-3"><label className="text-xs text-drift-muted">Quality (1-5)</label>
          <div className="flex gap-2 mt-1">{[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setQuality(n)} className={`flex-1 border rounded-lg py-2 text-sm transition ${quality === n ? 'bg-drift-accent text-white border-drift-accent' : 'bg-drift-bg border-purple-900/20 hover:bg-drift-accent/20'}`}>{n}</button>
          ))}</div>
        </div>
        <button onClick={handleSaveLog} disabled={saving} className="w-full mt-3 bg-drift-accent hover:bg-purple-600 text-white font-semibold py-2 rounded-xl transition disabled:opacity-50">{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Log'}</button>
      </div>
    </div>
  )
}
