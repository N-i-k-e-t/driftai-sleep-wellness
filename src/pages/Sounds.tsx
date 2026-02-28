import { useState, useRef, useEffect } from 'react'
import { CloudRain, Waves, TreePine, Radio, Music, Wind, Play, Pause, Volume2, VolumeX, Bird, Coffee, Flame, Droplets, Mountain, Heart, Brain, Sparkles } from 'lucide-react'

type Category = 'all' | 'nature' | 'sleep' | 'focus' | 'meditation' | 'ambient'

interface Sound {
  id: string
  name: string
  icon: any
  color: string
  category: Category[]
  url: string
  credit: string
}

const sounds: Sound[] = [
  { id: 'rain', name: 'Rain', icon: CloudRain, color: 'from-blue-500/20 to-blue-900/20', category: ['nature', 'sleep'], url: 'https://cdn.pixabay.com/audio/2022/05/31/audio_41a25f42c6.mp3', credit: 'CC0 Pixabay' },
  { id: 'ocean', name: 'Ocean Waves', icon: Waves, color: 'from-cyan-500/20 to-cyan-900/20', category: ['nature', 'sleep'], url: 'https://cdn.pixabay.com/audio/2024/11/04/audio_38b41dbc3b.mp3', credit: 'CC0 Pixabay' },
  { id: 'forest', name: 'Forest', icon: TreePine, color: 'from-green-500/20 to-green-900/20', category: ['nature', 'meditation'], url: 'https://cdn.pixabay.com/audio/2022/08/31/audio_419263ef03.mp3', credit: 'CC0 Pixabay' },
  { id: 'whitenoise', name: 'White Noise', icon: Radio, color: 'from-gray-500/20 to-gray-900/20', category: ['sleep', 'focus'], url: 'https://cdn.pixabay.com/audio/2023/09/25/audio_66e46acc3c.mp3', credit: 'CC0 Pixabay' },
  { id: 'lofi', name: 'Lo-fi Beats', icon: Music, color: 'from-purple-500/20 to-purple-900/20', category: ['focus', 'ambient'], url: 'https://cdn.pixabay.com/audio/2024/09/03/audio_e5e1ab5ff6.mp3', credit: 'CC0 Pixabay' },
  { id: 'wind', name: 'Gentle Wind', icon: Wind, color: 'from-teal-500/20 to-teal-900/20', category: ['nature', 'sleep'], url: 'https://cdn.pixabay.com/audio/2022/03/24/audio_7a7a1b2b0c.mp3', credit: 'CC0 Pixabay' },
  { id: 'birds', name: 'Morning Birds', icon: Bird, color: 'from-yellow-500/20 to-yellow-900/20', category: ['nature', 'meditation'], url: 'https://cdn.pixabay.com/audio/2022/02/23/audio_0548a498d0.mp3', credit: 'CC0 Pixabay' },
  { id: 'fireplace', name: 'Fireplace', icon: Flame, color: 'from-orange-500/20 to-orange-900/20', category: ['ambient', 'sleep'], url: 'https://cdn.pixabay.com/audio/2024/06/07/audio_16b2e88db7.mp3', credit: 'CC0 Pixabay' },
  { id: 'thunder', name: 'Thunder Storm', icon: Droplets, color: 'from-indigo-500/20 to-indigo-900/20', category: ['nature', 'sleep'], url: 'https://cdn.pixabay.com/audio/2022/06/06/audio_8d74a3b4e0.mp3', credit: 'CC0 Pixabay' },
  { id: 'mountain', name: 'Mountain Stream', icon: Mountain, color: 'from-emerald-500/20 to-emerald-900/20', category: ['nature', 'meditation'], url: 'https://cdn.pixabay.com/audio/2024/02/08/audio_ae61c43a3e.mp3', credit: 'CC0 Pixabay' },
  { id: 'breathing', name: 'Deep Breathing', icon: Heart, color: 'from-rose-500/20 to-rose-900/20', category: ['meditation', 'sleep'], url: 'https://cdn.pixabay.com/audio/2023/06/20/audio_3c3c3eef0c.mp3', credit: 'CC0 Pixabay' },
  { id: 'focus', name: 'Focus Pulse', icon: Brain, color: 'from-violet-500/20 to-violet-900/20', category: ['focus'], url: 'https://cdn.pixabay.com/audio/2024/04/17/audio_d3e7a64bd5.mp3', credit: 'CC0 Pixabay' },
]

const categories: { id: Category; label: string; icon: any }[] = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'nature', label: 'Nature', icon: TreePine },
  { id: 'sleep', label: 'Sleep', icon: CloudRain },
  { id: 'focus', label: 'Focus', icon: Brain },
  { id: 'meditation', label: 'Meditation', icon: Heart },
  { id: 'ambient', label: 'Ambient', icon: Flame },
]

export default function Sounds() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.7)
  const [muted, setMuted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null } }
  }, [])

  const toggle = (id: string, url: string) => {
    if (playing === id) {
      audioRef.current?.pause()
      setPlaying(null)
    } else {
      if (audioRef.current) audioRef.current.pause()
      const audio = new Audio(url)
      audio.loop = true
      audio.volume = muted ? 0 : volume
      audio.play().catch(() => {})
      audioRef.current = audio
      setPlaying(id)
    }
  }

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  const filtered = activeCategory === 'all' ? sounds : sounds.filter(s => s.category.includes(activeCategory))

  return (
    <div className="space-y-4 pb-4">
      <div>
        <h1 className="text-2xl font-bold">Sleep Sounds</h1>
        <p className="text-drift-muted text-sm">Tap to play · All sounds are royalty-free (CC0)</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${activeCategory === cat.id ? 'bg-drift-accent text-white' : 'bg-drift-card text-drift-muted border border-purple-900/20'}`}>
            <cat.icon size={14} />{cat.label}
          </button>
        ))}
      </div>

      {playing && (
        <div className="flex items-center gap-3 bg-drift-card rounded-xl p-3 border border-purple-900/20">
          <button onClick={() => setMuted(!muted)} className="text-drift-accent">
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input type="range" min="0" max="1" step="0.01" value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="flex-1 accent-purple-500 h-1" />
          <span className="text-xs text-drift-muted w-8 text-right">{Math.round(volume * 100)}%</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(({ id, name, icon: Icon, color, url, credit }) => (
          <button key={id} onClick={() => toggle(id, url)}
            className={`bg-gradient-to-br ${color} rounded-2xl p-4 border ${playing === id ? 'border-drift-accent shadow-lg shadow-purple-500/10' : 'border-purple-900/20'} transition-all text-left`}>
            <div className="flex justify-between items-start mb-3">
              <Icon className={playing === id ? 'text-drift-accent' : 'text-drift-muted'} size={22} />
              <div className={`p-1.5 rounded-full ${playing === id ? 'bg-drift-accent' : 'bg-drift-bg'}`}>
                {playing === id ? <Pause size={12} className="text-white" /> : <Play size={12} className="text-drift-muted" />}
              </div>
            </div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-[10px] text-drift-muted mt-0.5">{playing === id ? 'Playing...' : credit}</p>
          </button>
        ))}
      </div>

      <p className="text-[10px] text-drift-muted text-center pt-2">
        All audio content is licensed under Creative Commons Zero (CC0).
        No copyright restrictions apply.
      </p>
    </div>
  )
}
