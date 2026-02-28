import { Outlet, NavLink } from 'react-router-dom'
import { Home, Music, BarChart3, Bot, User } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/sounds', icon: Music, label: 'Sounds' },
  { to: '/tracker', icon: BarChart3, label: 'Track' },
  { to: '/sleep-ai', icon: Bot, label: 'AI' },
  { to: '/profile', icon: User, label: 'Profile' }
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-drift-bg text-drift-text flex flex-col max-w-md mx-auto">
      <main className="flex-1 px-4 pt-6 pb-24 overflow-y-auto">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-drift-bg/95 backdrop-blur-lg border-t border-purple-900/20 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto px-2 py-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all text-[11px] ${isActive ? 'text-drift-accent' : 'text-drift-muted hover:text-drift-text'}`}>
              <Icon size={20} />{label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
