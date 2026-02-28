import { Sparkles, Lightbulb, Moon, Coffee } from 'lucide-react'

const insights = [
  { icon: Moon, title: 'Optimal Bedtime', text: 'Based on your data, 10:30 PM is your ideal bedtime for maximum rest.', color: 'text-purple-400' },
  { icon: Coffee, title: 'Caffeine Impact', text: 'Your sleep quality drops 23% when you have caffeine after 3 PM.', color: 'text-amber-400' },
  { icon: Lightbulb, title: 'Weekend Pattern', text: 'You sleep 45 min more on weekends. Try to keep a consistent schedule.', color: 'text-yellow-400' },
  { icon: Sparkles, title: 'Sleep Quality Up', text: 'Your deep sleep has improved 18% this month. Great progress!', color: 'text-green-400' }
]

export default function Insights() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">AI Insights</h1><p className="text-drift-muted text-sm">Personalized tips from your sleep data</p></div>
      <div className="bg-gradient-to-br from-drift-accent/10 to-purple-900/10 rounded-2xl p-5 border border-drift-accent/30">
        <div className="flex items-center gap-2 mb-3"><Sparkles className="text-drift-accent" size={18} /><span className="text-sm font-medium">AI Summary</span></div>
        <p className="text-sm text-drift-muted leading-relaxed">Your sleep patterns show improvement this week. Your average sleep duration increased and you maintained a more consistent bedtime. Keep focusing on your wind-down routine for even better results.</p>
      </div>
      <div className="space-y-3">
        {insights.map(({ icon: Icon, title, text, color }) => (
          <div key={title} className="bg-drift-card rounded-2xl p-4 border border-purple-900/20">
            <div className="flex items-start gap-3">
              <div className="bg-drift-bg p-2 rounded-xl"><Icon className={color} size={18} /></div>
              <div><p className="font-medium text-sm">{title}</p><p className="text-xs text-drift-muted mt-1">{text}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
