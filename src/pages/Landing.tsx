import { Link } from 'react-router-dom'
import { Moon, Music, BarChart3, Sparkles, Shield } from 'lucide-react'

const features = [
  { icon: Moon, title: 'Smart Sleep Tracking', desc: 'Log and analyze your sleep patterns effortlessly' },
  { icon: Music, title: 'Ambient Soundscapes', desc: 'Curated sounds to help you drift off peacefully' },
  { icon: BarChart3, title: 'Sleep Analytics', desc: 'Weekly insights into your sleep quality trends' },
  { icon: Sparkles, title: 'AI Insights', desc: 'Personalized tips powered by your sleep data' },
  { icon: Shield, title: 'Privacy First', desc: 'Your sleep data stays secure and private' }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-drift-bg">
      <header className="px-6 py-4 flex justify-between items-center max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <Moon className="text-drift-accent" size={24} />
          <span className="text-xl font-bold bg-gradient-to-r from-drift-accent to-drift-glow bg-clip-text text-transparent">Sleepzy</span>
        </div>
        <Link to="/auth" className="text-sm text-drift-muted hover:text-drift-text transition">Sign In</Link>
      </header>
      <main className="max-w-md mx-auto px-6 pt-12 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-drift-glow to-drift-accent bg-clip-text text-transparent">Sleep Smarter with AI</h1>
          <p className="text-drift-muted text-lg mb-8">Your personal AI companion for better sleep and wellness</p>
          <Link to="/auth" className="inline-block bg-drift-accent hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-purple-500/25">Start Free Trial</Link>
          <p className="text-drift-muted text-xs mt-3">3-day free trial, then Rs.199/mo</p>
        </div>
        <div className="space-y-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-drift-card rounded-2xl p-4 flex items-start gap-4 border border-purple-900/20">
              <div className="bg-drift-accent/10 p-2 rounded-xl"><Icon className="text-drift-accent" size={20} /></div>
              <div><h3 className="font-semibold text-drift-text">{title}</h3><p className="text-sm text-drift-muted">{desc}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-drift-card rounded-2xl p-6 border border-purple-900/20 text-center">
          <h2 className="text-xl font-bold mb-2">Simple Pricing</h2>
          <div className="flex gap-4 justify-center mt-4">
            <div className="bg-drift-bg rounded-xl p-4 flex-1 border border-purple-900/30">
              <p className="text-drift-muted text-sm">Monthly</p>
              <p className="text-2xl font-bold text-drift-accent">Rs.199</p>
              <p className="text-xs text-drift-muted">/month</p>
            </div>
            <div className="bg-drift-bg rounded-xl p-4 flex-1 border-2 border-drift-accent relative">
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-drift-accent text-white text-[10px] px-2 py-0.5 rounded-full">Save 37%</span>
              <p className="text-drift-muted text-sm">Yearly</p>
              <p className="text-2xl font-bold text-drift-accent">Rs.1499</p>
              <p className="text-xs text-drift-muted">/year</p>
            </div>
          </div>
        </div>
      </main>
            <footer className="border-t border-purple-900/20 mt-12 py-6 text-center">
        <div className="flex justify-center gap-6 text-drift-muted text-sm">
          <Link to="/terms" className="hover:text-drift-text transition">Terms & Conditions</Link>
          <Link to="/privacy" className="hover:text-drift-text transition">Privacy Policy</Link>
        </div>
        <p className="text-drift-muted text-xs mt-2">© 2025 Sleepzy. All rights reserved.</p>
      </footer>
    </div>
  )
}
