import { useState, useEffect } from 'react'
import { Flame, TrendingUp, Clock, Moon, CalendarDays } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface SleepLog {
  id: string
  bedtime: string
  wake_time: string
  quality: number
  created_at: string
}

interface DayData {
  day: string
  hours: number
  date: string
}

export default function Tracker() {
  const [weekData, setWeekData] = useState<DayData[]>([])
  const [prevWeekAvg, setPrevWeekAvg] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)
  const [recentLogs, setRecentLogs] = useState<SleepLog[]>([])

  useEffect(() => {
    fetchSleepData()
  }, [])

  const getHoursSlept = (bedtime: string, wakeTime: string): number => {
    const [bh, bm] = bedtime.split(':').map(Number)
    const [wh, wm] = wakeTime.split(':').map(Number)
    let bedMin = bh * 60 + bm
    let wakeMin = wh * 60 + wm
    if (wakeMin <= bedMin) wakeMin += 24 * 60
    return parseFloat(((wakeMin - bedMin) / 60).toFixed(1))
  }

  const fetchSleepData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const today = new Date()
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    // Fetch last 14 days of logs
    const twoWeeksAgo = new Date(today)
    twoWeeksAgo.setDate(today.getDate() - 14)

    const { data: logs } = await supabase
      .from('sleep_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', twoWeeksAgo.toISOString())
      .order('created_at', { ascending: false })

    if (!logs || logs.length === 0) {
      setLoading(false)
      return
    }

    setRecentLogs(logs.slice(0, 7))

    // Build this week's data (last 7 days)
    const thisWeek: DayData[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const log = logs.find((l: SleepLog) => l.created_at.split('T')[0] === dateStr)
      thisWeek.push({
        day: dayNames[d.getDay()],
        hours: log && log.bedtime && log.wake_time ? getHoursSlept(log.bedtime, log.wake_time) : 0,
        date: dateStr
      })
    }
    setWeekData(thisWeek)

    // Calculate previous week average
    const prevWeekLogs = logs.filter((l: SleepLog) => {
      const logDate = new Date(l.created_at)
      const daysAgo = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))
      return daysAgo >= 7 && daysAgo < 14
    })
    if (prevWeekLogs.length > 0) {
      const prevTotal = prevWeekLogs.reduce((s: number, l: SleepLog) => {
        return s + (l.bedtime && l.wake_time ? getHoursSlept(l.bedtime, l.wake_time) : 0)
      }, 0)
      setPrevWeekAvg(prevTotal / prevWeekLogs.length)
    }

    // Calculate streak
    let currentStreak = 0
    for (let i = 0; i < 30; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const hasLog = logs.some((l: SleepLog) => l.created_at.split('T')[0] === dateStr)
      if (hasLog) currentStreak++
      else break
    }
    setStreak(currentStreak)

    setLoading(false)
  }

  const loggedDays = weekData.filter(d => d.hours > 0)
  const avg = loggedDays.length > 0
    ? (loggedDays.reduce((s, d) => s + d.hours, 0) / loggedDays.length).toFixed(1)
    : '0'
  const maxH = Math.max(...weekData.map(d => d.hours), 1)

  const percentChange = prevWeekAvg && parseFloat(avg) > 0
    ? Math.round(((parseFloat(avg) - prevWeekAvg) / prevWeekAvg) * 100)
    : null

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-drift-muted">Loading your sleep data...</div>
      </div>
    )
  }

  if (loggedDays.length === 0) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold">Sleep Tracker</h1><p className="text-drift-muted text-sm">Your weekly sleep overview</p></div>
        <div className="bg-drift-card rounded-2xl p-8 border border-purple-900/20 text-center">
          <CalendarDays className="text-drift-accent mx-auto mb-4" size={48} />
          <h2 className="text-lg font-semibold mb-2">No Sleep Data Yet</h2>
          <p className="text-drift-muted text-sm mb-4">Start logging your sleep from the Home page to see your tracking data here.</p>
          <p className="text-drift-muted text-xs">Log your bedtime, wake time, and sleep quality each day to unlock insights about your sleep patterns.</p>
        </div>
        <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
          <p className="text-sm font-medium mb-3">How it works</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-drift-accent font-bold">1</span>
              <p className="text-xs text-drift-muted">Log your bedtime and wake-up time on the Home page each day</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-drift-accent font-bold">2</span>
              <p className="text-xs text-drift-muted">Rate your sleep quality from 1-5</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-drift-accent font-bold">3</span>
              <p className="text-xs text-drift-muted">Come back here to see your weekly trends, averages, and streaks</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
          <p className="text-xl font-bold">{percentChange !== null ? `${percentChange > 0 ? '+' : ''}${percentChange}%` : '--'}</p><p className="text-[10px] text-drift-muted">vs Last Week</p>
        </div>
        <div className="bg-drift-card rounded-2xl p-4 border border-purple-900/20 text-center">
          <Flame className="text-orange-400 mx-auto mb-1" size={18} />
          <p className="text-xl font-bold">{streak}</p><p className="text-[10px] text-drift-muted">Day Streak</p>
        </div>
      </div>
      <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
        <p className="text-sm font-medium mb-4">This Week</p>
        <div className="flex items-end justify-between gap-2" style={{ height: '160px' }}>
          {weekData.map(({ day, hours }) => (
            <div key={day} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
              <span className="text-[10px] text-drift-muted">{hours > 0 ? `${hours}h` : '-'}</span>
              <div className={`w-full rounded-t-lg ${hours > 0 ? 'bg-gradient-to-t from-drift-accent to-drift-glow' : 'bg-purple-900/20'}`} style={{ height: `${hours > 0 ? (hours / maxH) * 100 : 4}%`, minHeight: '4px' }} />
              <span className="text-[10px] text-drift-muted">{day}</span>
            </div>
          ))}
        </div>
      </div>
      {recentLogs.length > 0 && (
        <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
          <p className="text-sm font-medium mb-3">Recent Logs</p>
          <div className="space-y-2">
            {recentLogs.slice(0, 5).map((log) => {
              const d = new Date(log.created_at)
              const hours = log.bedtime && log.wake_time ? getHoursSlept(log.bedtime, log.wake_time) : 0
              return (
                <div key={log.id} className="flex items-center justify-between py-2 border-b border-purple-900/10 last:border-0">
                  <div className="flex items-center gap-2">
                    <Moon className="text-drift-accent" size={14} />
                    <span className="text-xs">{d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-drift-muted">{hours > 0 ? `${hours}h` : '--'}</span>
                    <span className="text-xs">{'★'.repeat(log.quality || 0)}{'☆'.repeat(5 - (log.quality || 0))}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
