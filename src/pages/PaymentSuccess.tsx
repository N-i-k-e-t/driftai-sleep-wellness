import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Camera, ArrowRight, Moon, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function PaymentSuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const plan = params.get('plan') || 'monthly'
  const [email, setEmail] = useState('')
  const invoiceNo = `SLZ-${Date.now().toString(36).toUpperCase()}`
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  const amount = plan === 'yearly' ? '1,499' : '199'
  const planLabel = plan === 'yearly' ? 'Yearly' : 'Monthly'

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setEmail(data.user.email || '')
        supabase.from('subscriptions').upsert({
          user_id: data.user.id, status: 'pro', plan,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })
        supabase.from('payment_logs').update({ status: 'completed' })
          .eq('user_id', data.user.id).eq('status', 'initiated')
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-drift-bg px-6 py-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <CheckCircle className="text-green-400 mx-auto mb-3" size={48} />
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p className="text-drift-muted text-sm mt-1">Welcome to Sleepzy Premium</p>
      </div>

      <div id="invoice" className="bg-drift-card rounded-2xl p-6 border border-purple-900/20 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Moon className="text-drift-accent" size={20} />
            <span className="font-bold">Sleepzy</span>
          </div>
          <FileText className="text-drift-muted" size={16} />
        </div>

        <div className="border-t border-purple-900/20 pt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-drift-muted">Invoice No.</span><span>{invoiceNo}</span></div>
          <div className="flex justify-between"><span className="text-drift-muted">Date</span><span>{date}</span></div>
          <div className="flex justify-between"><span className="text-drift-muted">Email</span><span className="text-xs">{email}</span></div>
          <div className="flex justify-between"><span className="text-drift-muted">Plan</span><span>Sleepzy {planLabel}</span></div>
          <div className="flex justify-between font-bold text-lg border-t border-purple-900/20 pt-2 mt-2">
            <span>Total</span><span className="text-drift-accent">Rs.{amount}</span>
          </div>
        </div>
        <div className="flex justify-between text-xs"><span className="text-drift-muted">Payment Method</span><span>PayPal</span></div>
        <div className="flex justify-between text-xs"><span className="text-drift-muted">Status</span><span className="text-green-400">Paid</span></div>
      </div>

      <p className="text-[10px] text-drift-muted text-center mt-4">
        Algeina Technology LLP (ANTS Network) &bull; Nashik, India
      </p>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 text-center">
        <Camera className="text-yellow-400 mx-auto mb-2" size={24} />
        <p className="text-sm font-medium text-yellow-300">Take a screenshot of your invoice!</p>
        <p className="text-xs text-drift-muted mt-1">Save this as your payment receipt for your records.</p>
      </div>

      <button onClick={() => navigate('/dashboard')}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-drift-accent to-drift-glow text-white font-medium py-3 rounded-xl hover:opacity-90 transition">
        Go to Dashboard <ArrowRight size={18} />
      </button>
    </div>
  )
}
