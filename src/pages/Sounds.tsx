import { useState } from 'react'
import { CloudRain, Waves, TreePine, Radio, Music, Wind, Play, Pause } from 'lucide-react'

const sounds = [
  { id: 'rain', name: 'Rain', icon: CloudRain, color: 'from-blue-500/20 to-blue-900/20' },
  { id: 'ocean', name: 'Ocean', icon: Waves, color: 'from-cyan-500/20 to-cyan-900/20' },
  { id: 'forest', name: 'Forest', icon: TreePine, color: 'from-green-500/20 to-green-900/20' },
  { id: 'whitenoise', name: 'White Noise', icon: Radio, color: 'from-gray-500/20 to-gray-900/20' },
  { id: 'lofi', name: 'Lo-fi', icon: Music, color: 'from-purple-500/20 to-purple-900/20' },
  { id: 'wind', name: 'Wind', icon: Wind, color: 'from-teal-500/20 to-teal-900/20' }
]

export default function Sounds() {
  const [playing, setPlaying] = useState<string | null>(null)

  const toggle = (id: string) => {
    setPlaying(playing === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Sleep Sounds</h1><p className="text-drift-muted text-sm">Tap to play ambient sounds</p></div>
      <div className="grid grid-cols-2 gap-4">
        {sounds.map(({ id, name, icon: Icon, color }) => (
          <button key={id} onClick={() => toggle(id)} className={`bg-gradient-to-br ${color} rounded-2xl p-5 border ${playing === id ? 'border-drift-accent shadow-lg shadow-purple-500/10' : 'border-purple-900/20'} transition-all text-left`}>
            <div className="flex justify-between items-start mb-4">
              <Icon className={playing === id ? 'text-drift-accent' : 'text-drift-muted'} size={24} />
              <div className={`p-1.5 rounded-full ${playing === id ? 'bg-drift-accent' : 'bg-drift-bg'}`}>
                {playing === id ? <Pause size={12} className="text-white" /> : <Play size={12} className="text-drift-muted" />}
              </div>
            </div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-drift-muted mt-0.5">{playing === id ? 'Playing...' : 'Tap to play'}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
