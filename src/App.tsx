import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Sounds from './pages/Sounds'
import Tracker from './pages/Tracker'
import Insights from './pages/Insights'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import Pricing from './pages/Pricing'
import PaymentSuccess from './pages/PaymentSuccess'
import Layout from './components/Layout'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Refund from './pages/Refund'
import About from './pages/About'
import SleepAI from './pages/SleepAI'
import NotFound from './pages/NotFound'
import ServerError from './pages/ServerError'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/about" element={<About />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sleep-ai" element={<SleepAI />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
