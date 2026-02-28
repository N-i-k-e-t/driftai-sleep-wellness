import { Moon, Home, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-drift-bg flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <Moon className="text-drift-accent mx-auto mb-4 animate-pulse" size={48} />
        <h1 className="text-6xl font-bold text-drift-accent mb-2">404</h1>
        <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
        <p className="text-drift-muted text-sm mb-6">
          Looks like this page drifted off to sleep. Let's get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-drift-card border border-purple-900/20 text-drift-muted hover:text-white transition text-sm">
            <ArrowLeft size={16} /> Go Back
          </button>
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-drift-accent text-white hover:opacity-90 transition text-sm">
            <Home size={16} /> Home
          </button>
        </div>
      </div>
    </div>
  )
}
