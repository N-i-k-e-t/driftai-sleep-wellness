import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MobileOnly from './components/MobileOnly.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MobileOnly>
      <App />
    </MobileOnly>
  </StrictMode>,
)
