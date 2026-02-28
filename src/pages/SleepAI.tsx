import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'ai'
  content: string
}

const SLEEP_TIPS: Record<string, string> = {
  'can\'t sleep': 'Try the 4-7-8 breathing technique: breathe in for 4 seconds, hold for 7, exhale for 8. Also, avoid screens 30 minutes before bed and keep your room cool (18-20\u00b0C).',
  'insomnia': 'Insomnia can be caused by stress, caffeine, or irregular schedules. Try setting a consistent bedtime, avoiding caffeine after 2 PM, and using our Sleep Sounds to create a calming routine.',
  'snoring': 'Snoring can be reduced by sleeping on your side, keeping a healthy weight, and avoiding alcohol before bed. If severe, consider consulting a sleep specialist.',
  'melatonin': 'Melatonin is a natural hormone that helps regulate sleep. Your body produces it in response to darkness. To boost it naturally, dim lights 1-2 hours before bed and avoid blue light from screens.',
  'nap': 'Short naps (20-30 minutes) before 3 PM can boost alertness without affecting nighttime sleep. Longer naps can cause grogginess and disrupt your sleep schedule.',
  'dream': 'Dreams mostly occur during REM sleep. To remember dreams better, keep a dream journal by your bed and write immediately upon waking. Vivid dreams can indicate good REM sleep quality.',
  'caffeine': 'Caffeine has a half-life of 5-6 hours. A coffee at 3 PM means half the caffeine is still in your system at 9 PM. Try to limit caffeine to mornings only for better sleep.',
  'stress': 'Stress is a major sleep disruptor. Try progressive muscle relaxation: tense each muscle group for 5 seconds, then release. Start from toes and work up to your head.',
  'default': 'I\'m your Sleep AI assistant! I can help with sleep tips, explain sleep science, suggest bedtime routines, and answer questions about sleep health. What would you like to know?'
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const [key, value] of Object.entries(SLEEP_TIPS)) {
    if (key !== 'default' && lower.includes(key)) return value
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return 'Hello! I\'m Sleepzy AI, your sleep wellness assistant. Ask me anything about improving your sleep, bedtime routines, or sleep science!'
  if (lower.includes('routine') || lower.includes('bedtime'))
    return 'A great bedtime routine: 1) Stop screens 30 min before bed, 2) Dim lights, 3) Light stretching or reading, 4) Use our Sleep Sounds for ambient relaxation, 5) Practice deep breathing. Consistency is key!'
  if (lower.includes('how much sleep') || lower.includes('hours'))
    return 'Adults need 7-9 hours of sleep per night. Teens need 8-10 hours. The quality matters as much as quantity \u2014 deep sleep and REM cycles are crucial for recovery and memory.'
  if (lower.includes('thank'))
    return 'You\'re welcome! Sleep well tonight. Remember, consistent sleep habits lead to the best results. Sweet dreams! \ud83c\udf19'
  return SLEEP_TIPS.default
}

export default function SleepAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hi! I\'m Sleepzy AI \ud83c\udf19 Your personal sleep wellness assistant. Ask me anything about sleep, routines, or how to rest better!' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const aiMsg: Message = { role: 'ai', content: getAIResponse(userMsg.content) }
      setMessages(prev => [...prev, aiMsg])
      setTyping(false)
    }, 800 + Math.random() * 1200)
  }

  const quickQuestions = ['How much sleep do I need?', 'Help me with insomnia', 'Best bedtime routine', 'Caffeine and sleep']

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="flex items-center gap-3 pb-3 border-b border-purple-900/20">
        <div className="p-2 rounded-full bg-drift-accent/20">
          <Sparkles className="text-drift-accent" size={20} />
        </div>
        <div>
          <h1 className="font-bold text-lg">Sleep AI</h1>
          <p className="text-drift-muted text-xs">Your personal sleep assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && <Bot className="text-drift-accent flex-shrink-0 mt-1" size={18} />}
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-drift-accent text-white rounded-br-md'
                : 'bg-drift-card border border-purple-900/20 rounded-bl-md'
            }`}>
              {msg.content}
            </div>
            {msg.role === 'user' && <User className="text-drift-accent flex-shrink-0 mt-1" size={18} />}
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            <Bot className="text-drift-accent flex-shrink-0 mt-1" size={18} />
            <div className="bg-drift-card border border-purple-900/20 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 pb-3">
          {quickQuestions.map(q => (
            <button key={q} onClick={() => { setInput(q); }} className="text-xs px-3 py-1.5 rounded-full bg-drift-card border border-purple-900/20 text-drift-muted hover:text-white transition">
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-2 border-t border-purple-900/20">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about sleep..."
          className="flex-1 bg-drift-card border border-purple-900/20 rounded-xl px-4 py-2.5 text-sm text-drift-text placeholder-drift-muted focus:outline-none focus:border-drift-accent transition" />
        <button onClick={send} disabled={!input.trim() || typing}
          className="p-2.5 rounded-xl bg-drift-accent text-white hover:opacity-90 transition disabled:opacity-50">
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
