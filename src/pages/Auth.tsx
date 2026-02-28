import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Moon } from 'lucide-react'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) throw authError
      } else {
        const { data, error: authError } = await supabase.auth.signUp({ email, password })
        if (authError) throw authError

        if (data.user) {
          // Create profile
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            email: data.user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' })
          if (profileError) console.error('Profile creation error:', profileError)

          // Create trial subscription
          const trialEnd = new Date()
          trialEnd.setDate(trialEnd.getDate() + 3)
          const { error: subError } = await supabase.from('subscriptions').upsert({
            user_id: data.user.id,
            status: 'trial',
            plan: 'trial',
            trial_ends_at: trialEnd.toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' })
          if (subError) console.error('Subscription creation error:', subError)
        }
      }
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-drift-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Moon className="text-drift-accent mx-auto mb-3" size={32} />
          <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-drift-muted text-sm mt-1">Sleep better with Sleepzy</p>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-drift-card border border-purple-900/20 rounded-xl px-4 py-3 text-drift-text placeholder-drift-muted focus:outline-none focus:border-drift-accent transition" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-drift-card border border-purple-900/20 rounded-xl px-4 py-3 text-drift-text placeholder-drift-muted focus:outline-none focus:border-drift-accent transition" />
          <button type="submit" disabled={loading} className="w-full bg-drift-accent hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50">{loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <p className="text-center text-drift-muted text-sm mt-6">{isLogin ? "Don't have an account?" : 'Already have an account?'} <button onClick={() => setIsLogin(!isLogin)} className="text-drift-accent hover:underline">{isLogin ? 'Sign Up' : 'Sign In'}</button></p>
      </div>
    </div>
  )
}
