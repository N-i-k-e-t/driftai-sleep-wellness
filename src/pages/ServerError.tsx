import { ServerCrash, RefreshCw, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ServerError() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-drift-bg flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <ServerCrash className="text-red-400 mx-auto mb-4" size={48} />
        <h1 className="text-5xl font-bold text-red-400 mb-2">500</h1>
        <h2 className="text-xl font-bold mb-2">Server Error</h2>
        <p className="text-drift-muted text-sm mb-6">
          Our servers are taking a nap. We're working on waking them up. Please try again in a moment.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-drift-card border border-purple-900/20 text-drift-muted hover:text-white transition text-sm">
            <RefreshCw size={16} /> Retry
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
