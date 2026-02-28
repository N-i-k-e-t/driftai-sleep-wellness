import { Routes, Route, Navigate } from 'react-router-dom'
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
