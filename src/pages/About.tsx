import { ArrowLeft, Moon, Shield, Sparkles, Users, Mail, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-drift-bg px-6 py-8 max-w-md mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-drift-muted mb-6 hover:text-white transition">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="text-center mb-8">
        <Moon className="text-drift-accent mx-auto mb-3" size={40} />
        <h1 className="text-3xl font-bold">About Sleepzy</h1>
        <p className="text-drift-muted mt-2">Your AI-powered sleep companion</p>
      </div>

      <div className="space-y-4">
        <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
          <h2 className="font-bold text-lg mb-2">Our Mission</h2>
          <p className="text-drift-muted text-sm leading-relaxed">
            We believe quality sleep should be accessible to everyone. Sleepzy combines AI-driven insights
            with ambient soundscapes to help you build better sleep habits, without the high price tags
            of traditional wellness apps.
          </p>
        </div>

        <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
          <h2 className="font-bold text-lg mb-3">What Makes Us Different</h2>
          <div className="space-y-3">
            {[
              { icon: Sparkles, title: 'AI-Powered Insights', desc: 'Personalised sleep recommendations that learn from your patterns' },
              { icon: Shield, title: 'Privacy First', desc: 'Your sleep data is encrypted and never sold to third parties' },
              { icon: Users, title: 'Affordable for Everyone', desc: 'Starting at just Rs.199/month — a fraction of what other apps charge' },
              { icon: Moon, title: 'No App Store Needed', desc: 'Install directly from your browser as a PWA — works offline too' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <Icon className="text-drift-accent flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-medium text-sm">{title}</p>
                  <p className="text-drift-muted text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-drift-card rounded-2xl p-5 border border-purple-900/20">
          <h2 className="font-bold text-lg mb-3">The Team</h2>
          <p className="text-drift-muted text-sm mb-3">
            Sleepzy is built and maintained by <span className="text-white font-medium">Algeina Technology LLP</span>,
            operating under the <span className="text-drift-accent font-medium">ANTS Network</span> brand.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-drift-muted">
              <MapPin size={14} className="text-drift-accent" /> Nashik, Maharashtra, India
            </div>
            <div className="flex items-center gap-2 text-drift-muted">
              <Mail size={14} className="text-drift-accent" /> support@andsnetwork.com
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-drift-accent/10 to-drift-glow/10 rounded-2xl p-5 border border-purple-900/20 text-center">
          <p className="text-sm text-drift-muted">Version 1.0.0</p>
          <p className="text-xs text-drift-muted mt-1">&copy; 2026 Sleepzy. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
