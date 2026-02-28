import { useEffect, useState, ReactNode } from 'react'

function QRCode() {
  return (
    <div className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center p-2 mx-auto mt-4">
      {/* QR code placeholder - shows URL encoded as simple pattern */}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="100" height="100" fill="white"/>
        {/* Top-left finder */}
        <rect x="5" y="5" width="30" height="30" fill="black"/>
        <rect x="10" y="10" width="20" height="20" fill="white"/>
        <rect x="14" y="14" width="12" height="12" fill="black"/>
        {/* Top-right finder */}
        <rect x="65" y="5" width="30" height="30" fill="black"/>
        <rect x="70" y="10" width="20" height="20" fill="white"/>
        <rect x="74" y="14" width="12" height="12" fill="black"/>
        {/* Bottom-left finder */}
        <rect x="5" y="65" width="30" height="30" fill="black"/>
        <rect x="10" y="70" width="20" height="20" fill="white"/>
        <rect x="14" y="74" width="12" height="12" fill="black"/>
        {/* Data modules pattern */}
        <rect x="42" y="5" width="5" height="5" fill="black"/>
        <rect x="52" y="5" width="5" height="5" fill="black"/>
        <rect x="42" y="15" width="5" height="5" fill="black"/>
        <rect x="52" y="20" width="5" height="5" fill="black"/>
        <rect x="42" y="25" width="5" height="5" fill="black"/>
        <rect x="5" y="42" width="5" height="5" fill="black"/>
        <rect x="15" y="42" width="5" height="5" fill="black"/>
        <rect x="25" y="52" width="5" height="5" fill="black"/>
        <rect x="40" y="40" width="20" height="20" fill="black"/>
        <rect x="44" y="44" width="12" height="12" fill="white"/>
        <rect x="47" y="47" width="6" height="6" fill="black"/>
        <rect x="65" y="42" width="5" height="5" fill="black"/>
        <rect x="75" y="42" width="5" height="5" fill="black"/>
        <rect x="85" y="52" width="5" height="5" fill="black"/>
        <rect x="65" y="52" width="5" height="5" fill="black"/>
        <rect x="42" y="65" width="5" height="5" fill="black"/>
        <rect x="52" y="65" width="5" height="5" fill="black"/>
        <rect x="42" y="75" width="5" height="5" fill="black"/>
        <rect x="52" y="80" width="5" height="5" fill="black"/>
        <rect x="62" y="70" width="5" height="5" fill="black"/>
        <rect x="72" y="65" width="5" height="5" fill="black"/>
        <rect x="82" y="75" width="5" height="5" fill="black"/>
        <rect x="72" y="80" width="5" height="5" fill="black"/>
        <rect x="62" y="85" width="5" height="5" fill="black"/>
        <rect x="42" y="85" width="5" height="5" fill="black"/>
        <rect x="52" y="90" width="5" height="5" fill="black"/>
      </svg>
    </div>
  )
}

interface MobileOnlyProps {
  children: ReactNode
}

export default function MobileOnly({ children }: MobileOnlyProps) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      // Detect desktop: screen width > 768px AND not a touch device
      const isWide = window.innerWidth > 768
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      setIsDesktop(isWide && !isTouch && !isMobileUA)
      setChecked(true)
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  if (!checked) return null

  if (isDesktop) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f0a2e 0%, #1a0a3e 50%, #0f0a2e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '420px',
            color: 'white',
          }}
        >
          {/* Moon icon */}
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌙</div>

          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              background: 'linear-gradient(to right, #a78bfa, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
            }}
          >
            Sleepzy
          </h1>

          <p
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#e2e8f0',
              marginBottom: '8px',
            }}
          >
            This app is designed for smartphones
          </p>

          <p
            style={{
              fontSize: '14px',
              color: '#94a3b8',
              marginBottom: '28px',
              lineHeight: '1.6',
            }}
          >
            Sleepzy is a mobile-first Progressive Web App (PWA).<br />
            For the best experience, open it on your phone.
          </p>

          {/* Phone mockup visual */}
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(167,139,250,0.08)',
              border: '1px solid rgba(167,139,250,0.25)',
              borderRadius: '20px',
              padding: '24px 32px',
              marginBottom: '28px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>📱</div>
            <p style={{ fontSize: '13px', color: '#a78bfa', fontWeight: 600, margin: 0 }}>
              Open on your phone
            </p>
          </div>

          {/* Instructions */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'left',
            }}
          >
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              How to use Sleepzy
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>1️⃣</span>
                <span style={{ color: '#cbd5e1', fontSize: '14px' }}>Open <strong style={{ color: 'white' }}>sleepzy.andsnetwork.com</strong> on your phone&apos;s browser</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>2️⃣</span>
                <span style={{ color: '#cbd5e1', fontSize: '14px' }}>Tap <strong style={{ color: 'white' }}>"Add to Home Screen"</strong> to install as an app</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>3️⃣</span>
                <span style={{ color: '#cbd5e1', fontSize: '14px' }}>Enjoy <strong style={{ color: 'white' }}>Sleepzy</strong> as a native-like app on your phone!</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}>Or scan this QR code with your phone</p>
            <QRCode />
            <p style={{ color: '#475569', fontSize: '11px', marginTop: '8px' }}>sleepzy.andsnetwork.com</p>
          </div>

          <p style={{ color: '#334155', fontSize: '11px', marginTop: '24px' }}>
            © 2026 Sleepzy — Algeina Technology LLP (ANTS Network)
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
