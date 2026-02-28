import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Check, Crown, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID'

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    priceINR: 199,
    priceUSD: 2.49,
    period: '/month',
    features: ['All sleep sounds', 'AI insights', 'Sleep tracking', 'Mood logging', 'Weekly reports'],
    popular: false
  },
  {
    id: 'yearly',
    name: 'Yearly',
    priceINR: 1499,
    priceUSD: 17.99,
    period: '/year',
    features: ['All Monthly features', 'Save 37%', 'Priority support', 'Early access to new features', 'Custom sleep plans'],
    popular: true
  }
]

export default function Pricing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')

  const handlePayPalCheckout = async (planId: string) => {
    setLoading(true)
    const plan = plans.find(p => p.id === planId)
    if (!plan) return

    const amount = currency === 'INR' ? plan.priceINR : plan.priceUSD

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/')
        return
      }

      // PayPal redirect URL
      const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${import.meta.env.VITE_PAYPAL_BUSINESS_EMAIL || 'niketpatil@andsnetwork.com'}&item_name=DriftAI ${plan.name} Plan&amount=${amount}&currency_code=${currency}&return=${window.location.origin}/payment-success?plan=${planId}&user=${user.id}&cancel_return=${window.location.origin}/pricing`

      window.location.href = paypalURL
    } catch (err) {
      console.error('Payment error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-drift-bg text-white p-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-drift-muted mb-6 hover:text-white transition">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="text-center mb-8">
        <Crown className="text-yellow-400 mx-auto mb-3" size={40} />
        <h1 className="text-2xl font-bold">Upgrade to Premium</h1>
        <p className="text-drift-muted text-sm mt-2">Unlock all features and improve your sleep</p>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <button onClick={() => setCurrency('INR')} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${currency === 'INR' ? 'bg-drift-accent text-white' : 'bg-drift-card text-drift-muted'}`}>
          INR (India)
        </button>
        <button onClick={() => setCurrency('USD')} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${currency === 'USD' ? 'bg-drift-accent text-white' : 'bg-drift-card text-drift-muted'}`}>
          USD (Global)
        </button>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        {plans.map((plan) => (
          <div key={plan.id} className={`bg-drift-card rounded-2xl p-6 border ${plan.popular ? 'border-drift-accent' : 'border-purple-900/20'} relative`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-drift-accent text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>
            )}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">
                {currency === 'INR' ? `\u20B9${plan.priceINR}` : `$${plan.priceUSD}`}
              </span>
              <span className="text-drift-muted text-sm">{plan.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-green-400" /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePayPalCheckout(plan.id)}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-drift-accent to-drift-glow text-white font-medium py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay with PayPal`}
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-drift-muted text-xs mt-6">Secure payments via PayPal. Cancel anytime.</p>
    </div>
  )
}
