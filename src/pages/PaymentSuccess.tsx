import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { CheckCircle } from 'lucide-react'

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')

  useEffect(() => {
    activateSubscription()
  }, [])

  const activateSubscription = async () => {
    const plan = searchParams.get('plan')
    const userId = searchParams.get('user')

    if (!plan || !userId) {
      setStatus('error')
      return
    }

    try {
      const { data: existing } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (existing) {
        await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            plan: plan,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
      } else {
        await supabase
          .from('subscriptions')
          .insert({
            user_id: userId,
            status: 'active',
            plan: plan,
            created_at: new Date().toISOString()
          })
      }

      setStatus('success')
      setTimeout(() => navigate('/dashboard'), 3000)
    } catch (err) {
      console.error('Activation error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-drift-bg text-white flex items-center justify-center p-4">
      <div className="text-center">
        {status === 'processing' && (
          <>
            <div className="animate-spin w-12 h-12 border-4 border-drift-accent border-t-transparent rounded-full mx-auto mb-4" />
            <h1 className="text-xl font-bold">Processing Payment...</h1>
            <p className="text-drift-muted text-sm mt-2">Activating your subscription</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
            <h1 className="text-xl font-bold">Payment Successful!</h1>
            <p className="text-drift-muted text-sm mt-2">Your premium access is now active. Redirecting...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="text-xl font-bold text-red-400">Something went wrong</h1>
            <p className="text-drift-muted text-sm mt-2">Please contact support</p>
            <button onClick={() => navigate('/pricing')} className="mt-4 bg-drift-accent text-white px-6 py-2 rounded-xl">Try Again</button>
          </>
        )}
      </div>
    </div>
  )
}
