import { Link } from 'react-router-dom'
import { Moon, Music, BarChart3, Sparkles, Shield, Zap, Heart, Globe, Bot, DollarSign, Wifi, Lock } from 'lucide-react'

const features = [
  { icon: Moon, title: 'Smart Sleep Tracking', desc: 'Log and analyze your sleep patterns effortlessly' },
  { icon: Music, title: 'Ambient Soundscapes', desc: '12+ royalty-free sounds across 5 categories' },
  { icon: BarChart3, title: 'Sleep Analytics', desc: 'Weekly insights into your sleep quality trends' },
  { icon: Bot, title: 'AI Sleep Assistant', desc: 'Chat with our AI for personalized sleep tips' },
  { icon: Shield, title: 'Privacy First', desc: 'Your sleep data stays secure and private' },
  { icon: Sparkles, title: 'Smart Insights', desc: 'AI-powered tips based on your sleep data' }
]

const whyBetter = [
  { icon: DollarSign, title: 'Affordable', desc: 'Starting at just Rs.199/mo — up to 10x cheaper than other sleep apps' },
  { icon: Wifi, title: 'No App Store Needed', desc: 'Install as a PWA directly from your browser, works offline' },
  { icon: Lock, title: 'No Data Selling', desc: 'We never sell your sleep data to advertisers or third parties' },
  { icon: Globe, title: 'Works Everywhere', desc: 'Android, iOS, any browser — one app for all devices' },
  { icon: Bot, title: 'AI Built-In', desc: 'Free AI sleep assistant included, no separate subscription needed' },
  { icon: Heart, title: 'Built with Care', desc: 'Made by sleep enthusiasts, not a faceless corporation' }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-drift-bg text-drift-text">
      <header className="flex justify-between items-center px-6 py-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <Moon className="text-drift-accent" size={24} />
          <span className="font-bold text-lg">Sleepzy</span>
        </div>
        <Link to="/auth" className="text-sm text-drift-accent hover:underline">Sign In</Link>
      </header>

      <main className="px-6 max-w-lg mx-auto">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4 leading-tight">Sleep Smarter<br/>with AI</h1>
          <p className="text-drift-muted mb-6">Your personal AI companion for better sleep and wellness</p>
          <Link to="/auth" className="inline-block bg-gradient-to-r from-drift-accent to-drift-glow text-white font-medium px-8 py-3 rounded-full hover:opacity-90 transition">
            Start Free Trial
          </Link>
          <p className="text-drift-muted text-xs mt-3">3-day free trial, then Rs.199/mo</p>
        </section>

        <section className="grid grid-cols-2 gap-3 py-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-drift-card rounded-2xl p-4 border border-purple-900/20">
              <Icon className="text-drift-accent mb-2" size={22} />
              <h3 className="font-medium text-sm mb-1">{title}</h3>
              <p className="text-drift-muted text-xs">{desc}</p>
            </div>
          ))}
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-6">Why We're Better</h2>
          <div className="space-y-3">
            {whyBetter.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3 bg-drift-card rounded-xl p-4 border border-purple-900/20">
                <Icon className="text-drift-accent flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-medium text-sm">{title}</h3>
                  <p className="text-drift-muted text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-6">Simple Pricing</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
              <h3 className="font-bold">Monthly</h3>
              <p className="text-2xl font-bold mt-2">Rs.199<span className="text-sm text-drift-muted font-normal">/month</span></p>
            </div>
            <div className="bg-drift-card rounded-2xl p-5 border border-drift-accent relative">
              <span className="absolute -top-2 right-3 bg-drift-accent text-white text-[10px] px-2 py-0.5 rounded-full">Save 37%</span>
              <h3 className="font-bold">Yearly</h3>
              <p className="text-2xl font-bold mt-2">Rs.1499<span className="text-sm text-drift-muted font-normal">/year</span></p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-purple-900/20 py-6 px-6 max-w-lg mx-auto">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-drift-muted mb-4">
          <Link to="/terms" className="hover:text-white transition">Terms</Link>
          <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link to="/refund" className="hover:text-white transition">Refund</Link>
          <Link to="/about" className="hover:text-white transition">About Us</Link>
        </div>
        <p className="text-center text-[10px] text-drift-muted">
          &copy; 2026 Sleepzy — A product of Algeina Technology LLP (ANTS Network). All rights reserved.
        </p>
      </footer>
    </div>
  )
}
