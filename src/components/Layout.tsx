import { Outlet, NavLink } from 'react-router-dom'
import { Home, Music, BarChart3, Sparkles, User } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/sounds', icon: Music, label: 'Sounds' },
  { to: '/tracker', icon: BarChart3, label: 'Track' },
  { to: '/insights', icon: Sparkles, label: 'Insights' },
  { to: '/profile', icon: User, label: 'Profile' }
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-drift-bg pb-20">
      <div className="max-w-md mx-auto px-4 pt-6"><Outlet /></div>
      <nav className="fixed bottom-0 left-0 right-0 bg-drift-card/95 backdrop-blur-lg border-t border-purple-900/30">
        <div className="max-w-md mx-auto flex justify-around py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${isActive ? 'text-drift-accent' : 'text-drift-muted hover:text-drift-text'}`}>
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
