import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { User, Bell, CreditCard, LogOut, Moon, ChevronRight, Crown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Profile() {
  const navigate = useNavigate()
  const [subscription, setSubscription] = useState<any>(null)
  const [daysLeft, setDaysLeft] = useState(0)
  const [isPaid, setIsPaid] = useState(false)
  const [trialExpired, setTrialExpired] = useState(false)

  useEffect(() => {
    checkSubscription()
  }, [])

  const checkSubscription = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()
    if (sub) {
      setSubscription(sub)
      setIsPaid(sub.status === 'active')
      if (sub.status === 'trial') {
        const created = new Date(sub.created_at)
        const now = new Date()
        const diffDays = Math.ceil((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
        const remaining = Math.max(0, 3 - diffDays)
        setDaysLeft(remaining)
        if (remaining <= 0) {
          setIsPaid(false)
          setTrialExpired(true)
        }
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const getSubDesc = () => {
    if (isPaid && subscription?.plan) {
      return `${subscription.plan === 'monthly' ? 'Monthly' : 'Yearly'} Plan Active`
    }
    if (daysLeft > 0) return `Free Trial - ${daysLeft} days left`
    return 'Trial Expired - Upgrade Now'
  }

  const getHeaderStatus = () => {
    if (isPaid) return 'Premium Active'
    if (daysLeft > 0) return `Free Trial - ${daysLeft} days left`
    if (trialExpired) return 'Trial Expired'
    return 'Free Trial Active'
  }

  const menuItems = [
    { icon: User, label: 'Edit Profile', desc: 'Update your name and details' },
    { icon: Bell, label: 'Notifications', desc: 'Manage sleep reminders' },
    { icon: CreditCard, label: 'Subscription', desc: getSubDesc(), action: () => navigate('/pricing') },
    { icon: Moon, label: 'Sleep Goals', desc: 'Set your target sleep hours' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-drift-accent to-drift-glow rounded-full mx-auto mb-3 flex items-center justify-center">
          {isPaid ? <Crown size={32} className="text-yellow-400" /> : <User size={32} className="text-white" />}
        </div>
        <h1 className="text-xl font-bold">{isPaid ? 'Premium Member' : 'Sleep Explorer'}</h1>
        <p className="text-drift-muted text-sm">{getHeaderStatus()}</p>
      </div>
      <div className="space-y-2">
        {menuItems.map(({ icon: Icon, label, desc, action }) => (
          <button key={label} onClick={action} className="w-full bg-drift-card rounded-2xl p-4 border border-purple-900/20 flex items-center gap-3 text-left hover:border-drift-accent/30 transition">
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
