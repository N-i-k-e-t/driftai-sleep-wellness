import { useState, useEffect } from 'react'
import { Moon, Sun, CloudMoon, Check, BedDouble, AlarmClock } from 'lucide-react'
import { supabase } from '../lib/supabase'

const moods = ['😴', '😐', '🙂', '😊', '🤩']
const tips = ['Try dimming screens 1hr before bed', 'A cool room (18-20C) promotes better sleep', 'Consistent sleep schedule boosts quality', 'Deep breathing can help you fall asleep faster']

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [sleepScore, setSleepScore] = useState<number | null>(null)
  const [hasLogs, setHasLogs] = useState(false)
  const [sleepState, setSleepState] = useState<'idle' | 'sleeping' | 'awake'>('idle')
  const [bedtime, setBedtime] = useState('')
  const [wakeTime, setWakeTime] = useState('')
  const [sleepDuration, setSleepDuration] = useState<string | null>(null)
  const [quality, setQuality] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const tip = tips[Math.floor(Math.random() * tips.length)]

  useEffect(() => {
    checkLogs()
    // Restore sleep state from localStorage
    const stored = localStorage.getItem('sleepzy_bedtime')
    if (stored) {
      setBedtime(stored)
      setSleepState('sleeping')
    }
  }, [])

  const checkLogs = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('sleep_logs').select('quality').eq('user_id', user.id).order('created_at', { ascending: false }).limit(7)
    if (data && data.length > 0) {
      setHasLogs(true)
      const avg = data.reduce((s: number, d: any) => s + (d.quality || 3), 0) / data.length
      setSleepScore(Math.round(avg * 20))
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  const getTimeStr = (date: Date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  const handleStartSleep = () => {
    const now = new Date()
    const timeStr = getTimeStr(now)
    setBedtime(timeStr)
    setSleepState('sleeping')
    localStorage.setItem('sleepzy_bedtime', timeStr)
    setError('')
  }

  const handleWakeUp = () => {
    const now = new Date()
    const wakeStr = getTimeStr(now)
    setWakeTime(wakeStr)
    setSleepState('awake')
    localStorage.removeItem('sleepzy_bedtime')

    // Calculate duration
    const [bh, bm] = bedtime.split(':').map(Number)
    const [wh, wm] = wakeStr.split(':').map(Number)
    let bedMin = bh * 60 + bm
    let wakeMin = wh * 60 + wm
    if (wakeMin <= bedMin) wakeMin += 24 * 60
    const totalMin = wakeMin - bedMin
    const hours = Math.floor(totalMin / 60)
    const mins = totalMin % 60
    setSleepDuration(`${hours}h ${mins}m`)
  }

  const handleSaveLog = async () => {
    if (!bedtime || !wakeTime || !quality) {
      setError('Please rate your sleep quality before saving')
      return
    }
    setSaving(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')

      const today = new Date().toISOString().split('T')[0]
      const { data: existing } = await supabase
        .from('sleep_logs').select('id').eq('user_id', user.id)
        .gte('created_at', today + 'T00:00:00').lte('created_at', today + 'T23:59:59').limit(1)

      if (existing && existing.length > 0) {
        await supabase.from('sleep_logs').update({
          bedtime, wake_time: wakeTime, quality, mood: selectedMood,
          updated_at: new Date().toISOString()
        }).eq('id', existing[0].id)
      } else {
        await supabase.from('sleep_logs').insert({
          user_id: user.id, bedtime, wake_time: wakeTime, quality, mood: selectedMood,
          created_at: new Date().toISOString()
        })
      }

      setSaved(true)
      setSleepState('idle')
      setBedtime('')
      setWakeTime('')
      setSleepDuration(null)
      setQuality(null)
      setSelectedMood(null)
      setTimeout(() => setSaved(false), 3000)
      checkLogs()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setSleepState('idle')
    setBedtime('')
    setWakeTime('')
    setSleepDuration(null)
    setQuality(null)
    setError('')
    localStorage.removeItem('sleepzy_bedtime')
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

      <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
        <p className="text-sm font-medium mb-4">Sleep Log</p>
        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
        {saved && <div className="flex items-center gap-2 text-green-400 text-xs mb-3"><Check size={14} />Sleep log saved!</div>}

        {sleepState === 'idle' && (
          <div className="text-center">
            <button onClick={handleStartSleep} className="w-full bg-gradient-to-r from-drift-accent to-purple-600 text-white font-semibold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
              <BedDouble size={22} />
              <span className="text-lg">Start Sleep</span>
            </button>
            <p className="text-drift-muted text-xs mt-3">Tap when you're going to bed. We'll record the time automatically.</p>
          </div>
        )}

        {sleepState === 'sleeping' && (
          <div className="text-center space-y-4">
            <div className="bg-drift-bg rounded-xl p-4">
              <p className="text-drift-muted text-xs">Bedtime recorded</p>
              <p className="text-lg font-bold text-drift-accent">{formatTime(new Date(`2000-01-01T${bedtime}`))}</p>
            </div>
            <div className="animate-pulse text-drift-muted text-sm">💤 Sleeping...</div>
            <button onClick={handleWakeUp} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
              <AlarmClock size={22} />
              <span className="text-lg">I'm Awake</span>
            </button>
            <button onClick={handleReset} className="text-drift-muted text-xs hover:text-white transition">Cancel & Reset</button>
          </div>
        )}

        {sleepState === 'awake' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-drift-bg rounded-xl p-3 text-center">
                <p className="text-drift-muted text-xs">Bedtime</p>
                <p className="text-sm font-bold">{formatTime(new Date(`2000-01-01T${bedtime}`))}</p>
              </div>
              <div className="bg-drift-bg rounded-xl p-3 text-center">
                <p className="text-drift-muted text-xs">Wake up</p>
                <p className="text-sm font-bold">{formatTime(new Date(`2000-01-01T${wakeTime}`))}</p>
              </div>
            </div>
            {sleepDuration && (
              <div className="bg-gradient-to-r from-drift-accent/10 to-purple-900/10 rounded-xl p-3 text-center">
                <p className="text-drift-muted text-xs">You slept</p>
                <p className="text-2xl font-bold text-drift-accent">{sleepDuration}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-drift-muted mb-2">Rate your sleep quality</p>
              <div className="flex gap-2">{[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setQuality(n)} className={`flex-1 border rounded-xl py-2.5 text-sm font-medium transition ${quality === n ? 'bg-drift-accent text-white border-drift-accent' : 'bg-drift-bg border-purple-900/20 hover:bg-drift-accent/20'}`}>{n}</button>
              ))}</div>
            </div>
            <button onClick={handleSaveLog} disabled={saving} className="w-full bg-drift-accent hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">{saving ? 'Saving...' : 'Save Sleep Log'}</button>
            <button onClick={handleReset} className="w-full text-drift-muted text-xs hover:text-white transition text-center">Reset</button>
          </div>
        )}
      </div>
    </div>
  )
}
