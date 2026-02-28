import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const TRIAL_DAYS = 3

export function useSubscription() {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [subscription, setSubscription] = useState<any>(null)
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setHasAccess(false)
        setIsLoading(false)
        return
      }

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!sub) {
        // Create trial subscription for new user
        const { data: newSub } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user.id,
            status: 'trial',
            plan: 'trial',
            created_at: new Date().toISOString()
          })
          .select()
          .single()

        if (newSub) {
          setSubscription(newSub)
          setDaysLeft(TRIAL_DAYS)
          setHasAccess(true)
        }
      } else {
        setSubscription(sub)

        if (sub.status === 'active') {
          setHasAccess(true)
        } else if (sub.status === 'trial') {
          const created = new Date(sub.created_at)
          const now = new Date()
          const diffDays = Math.ceil((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
          const remaining = Math.max(0, TRIAL_DAYS - diffDays)
          setDaysLeft(remaining)
          setHasAccess(remaining > 0)
        } else {
          setHasAccess(false)
        }
      }
    } catch (err) {
      console.error('Subscription check error:', err)
      setHasAccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return { hasAccess, isLoading, subscription, daysLeft }
}
