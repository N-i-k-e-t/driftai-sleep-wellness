import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { User, Bell, CreditCard, LogOut, Moon, ChevronRight } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const menuItems = [
    { icon: User, label: 'Edit Profile', desc: 'Update your name and details' },
    { icon: Bell, label: 'Notifications', desc: 'Manage sleep reminders' },
    { icon: CreditCard, label: 'Subscription', desc: 'Free Trial - 5 days left' },
    { icon: Moon, label: 'Sleep Goals', desc: 'Set your target sleep hours' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-drift-accent to-drift-glow rounded-full mx-auto mb-3 flex items-center justify-center"><User size={32} className="text-white" /></div>
        <h1 className="text-xl font-bold">Sleep Explorer</h1>
        <p className="text-drift-muted text-sm">Free Trial Active</p>
      </div>
      <div className="space-y-2">
        {menuItems.map(({ icon: Icon, label, desc }) => (
          <button key={label} className="w-full bg-drift-card rounded-2xl p-4 border border-purple-900/20 flex items-center gap-3 text-left hover:border-drift-accent/30 transition">
            <div className="bg-drift-bg p-2 rounded-xl"><Icon className="text-drift-accent" size={18} /></div>
            <div className="flex-1"><p className="text-sm font-medium">{label}</p><p className="text-xs text-drift-muted">{desc}</p></div>
            <ChevronRight className="text-drift-muted" size={16} />
          </button>
        ))}
      </div>
      <button onClick={handleLogout} className="w-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition">
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  )
}
