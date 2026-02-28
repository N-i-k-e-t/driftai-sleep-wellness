import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-drift-bg text-white">
      <header className="px-6 py-4 flex items-center gap-4 max-w-3xl mx-auto">
        <Link to="/" className="text-drift-muted hover:text-white transition"><ArrowLeft size={20} /></Link>
        <h1 className="text-xl font-bold">Privacy Policy</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 pb-20 space-y-6 text-drift-muted text-sm leading-relaxed">
        <p className="text-xs">Last updated: March 1, 2026</p>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Information We Collect</h2>
          <p>We collect information you provide directly: email address, account credentials, sleep log data, mood entries, and app preferences. We also collect usage data such as app interaction patterns and device information.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. How We Use Your Information</h2>
          <p>Your data is used to provide and improve the Sleepzy service, generate personalized sleep insights, send relevant notifications, and process subscription payments. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. Data Storage & Security</h2>
          <p>Your data is stored securely using Supabase cloud infrastructure with encryption at rest and in transit. We implement industry-standard security measures to protect your information.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Sleep & Health Data</h2>
          <p>Sleep tracking data, mood logs, and wellness metrics are stored in your personal account and are not shared with other users. This data is used solely to provide you with personalized insights and recommendations.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Third-Party Services</h2>
          <p>We use third-party services for authentication (Supabase Auth), hosting (Vercel), and payment processing. These services have their own privacy policies and handle data according to their terms.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Cookies & Local Storage</h2>
          <p>Sleepzy uses local storage and session cookies to maintain your login state and app preferences. We do not use tracking cookies for advertising purposes.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal data at any time through your Profile settings. You may also request a complete data export or account deletion by contacting us.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">8. Children's Privacy</h2>
          <p>Sleepzy is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will notify users of significant changes through the App or via email.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">10. Contact Us</h2>
          <p>For privacy-related inquiries, contact us at <a href="mailto:niketpatil@andsnetwork.com" className="text-drift-accent hover:underline">niketpatil@andsnetwork.com</a></p>
        </section>
      </main>
    </div>
  )
}
