import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Check, Crown, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

const plans = [
  { id: 'monthly', name: 'Monthly', priceINR: 199, priceUSD: 2.49, period: '/month', features: ['All sleep sounds', 'AI sleep assistant', 'Sleep tracking', 'Mood logging', 'Weekly reports'], popular: false },
  { id: 'yearly', name: 'Yearly', priceINR: 1499, priceUSD: 17.99, period: '/year', features: ['All Monthly features', 'Save 37%', 'Priority support', 'Early access to new features', 'Custom sleep plans'], popular: true }
]

export default function Pricing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', address: '', age: '' })
  const [formError, setFormError] = useState('')

  const handlePayPalCheckout = async () => {
    if (!form.name || !form.phone || !form.age) {
      setFormError('Please fill in all required fields')
      return
    }
    setFormError('')
    setLoading(true)
    const plan = plans.find(p => p.id === selectedPlan)
    if (!plan) return
    const amount = currency === 'INR' ? plan.priceINR : plan.priceUSD
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/auth'); return }
      await supabase.from('payment_logs').insert({
        user_id: user.id, email: user.email, plan: plan.id,
        amount, currency, status: 'initiated',
        customer_name: form.name, customer_phone: form.phone,
        customer_address: form.address, customer_age: parseInt(form.age),
        created_at: new Date().toISOString()
      }).catch(() => {})
      const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${import.meta.env.VITE_PAYPAL_BUSINESS_EMAIL || 'niketpatil@andsnetwork.com'}&item_name=Sleepzy ${plan.name} Plan&amount=${amount}&currency_code=${currency}&return=${window.location.origin}/payment-success?plan=${plan.id}&user=${user.id}&cancel_return=${window.location.origin}/pricing`
      window.location.href = paypalURL
    } catch (err) { console.error('Payment error:', err) }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-drift-bg px-6 py-8 max-w-md mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-drift-muted mb-6 hover:text-white transition">
        <ArrowLeft size={20} /> Back
      </button>
      <h1 className="text-2xl font-bold text-center">Upgrade to Premium</h1>
      <p className="text-drift-muted text-center text-sm mb-4">Unlock all features and improve your sleep</p>

      <div className="flex justify-center gap-2 mb-6">
        <button onClick={() => setCurrency('INR')} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${currency === 'INR' ? 'bg-drift-accent text-white' : 'bg-drift-card text-drift-muted'}`}>INR</button>
        <button onClick={() => setCurrency('USD')} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${currency === 'USD' ? 'bg-drift-accent text-white' : 'bg-drift-card text-drift-muted'}`}>USD</button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {plans.map((plan) => (
          <button key={plan.id} onClick={() => setSelectedPlan(plan.id)}
            className={`bg-drift-card rounded-2xl p-4 border text-left transition ${selectedPlan === plan.id ? 'border-drift-accent' : 'border-purple-900/20'} relative`}>
            {plan.popular && <span className="absolute -top-2 right-2 bg-drift-accent text-white text-[10px] px-2 py-0.5 rounded-full">BEST</span>}
            <h3 className="font-bold text-sm">{plan.name}</h3>
            <p className="text-xl font-bold mt-1">{currency === 'INR' ? `\u20B9${plan.priceINR}` : `$${plan.priceUSD}`}<span className="text-xs text-drift-muted font-normal">{plan.period}</span></p>
            <div className="mt-2 space-y-1">
              {plan.features.slice(0, 3).map(f => (
                <div key={f} className="flex items-center gap-1 text-[11px] text-drift-muted"><Check size={10} className="text-drift-accent" />{f}</div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {selectedPlan && (
        <div className="space-y-3 mb-6">
          <h2 className="font-bold">Your Details</h2>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full Name *" className="w-full bg-drift-card border border-purple-900/20 rounded-xl px-4 py-3 text-sm text-drift-text placeholder-drift-muted focus:outline-none focus:border-drift-accent" />
          <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone Number *" type="tel" className="w-full bg-drift-card border border-purple-900/20 rounded-xl px-4 py-3 text-sm text-drift-text placeholder-drift-muted focus:outline-none focus:border-drift-accent" />
          <input value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="Age *" type="number" min="13" max="120" className="w-full bg-drift-card border border-purple-900/20 rounded-xl px-4 py-3 text-sm text-drift-text placeholder-drift-muted focus:outline-none focus:border-drift-accent" />
          <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Address (optional)" className="w-full bg-drift-card border border-purple-900/20 rounded-xl px-4 py-3 text-sm text-drift-text placeholder-drift-muted focus:outline-none focus:border-drift-accent" />
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          <button onClick={handlePayPalCheckout} disabled={loading}
            className="w-full bg-gradient-to-r from-drift-accent to-drift-glow text-white font-medium py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
            {loading ? 'Processing...' : 'Pay with PayPal'}
          </button>
        </div>
      )}

      <p className="text-[10px] text-drift-muted text-center">Secure payments via PayPal. Cancel anytime.</p>
    </div>
  )
}
