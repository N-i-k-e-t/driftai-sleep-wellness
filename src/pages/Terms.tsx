import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-drift-bg text-white">
      <header className="px-6 py-4 flex items-center gap-4 max-w-3xl mx-auto">
        <Link to="/" className="text-drift-muted hover:text-white transition"><ArrowLeft size={20} /></Link>
        <h1 className="text-xl font-bold">Terms & Conditions</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 pb-20 space-y-6 text-drift-muted text-sm leading-relaxed">
        <p className="text-xs">Last updated: March 1, 2026</p>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using Sleepzy ("the App"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the App.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. Description of Service</h2>
          <p>Sleepzy is a sleep wellness application that provides sleep tracking, ambient soundscapes, sleep analytics, and AI-powered insights. The App is not a medical device and should not be used as a substitute for professional medical advice.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. User Accounts</h2>
          <p>You must create an account to use certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Subscription & Payments</h2>
          <p>Sleepzy offers a 3-day free trial followed by a paid subscription (Rs.199/month or Rs.1499/year). Subscriptions auto-renew unless cancelled before the renewal date. Refunds are subject to our refund policy.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. User Conduct</h2>
          <p>You agree not to misuse the App, reverse engineer it, or use it for any unlawful purpose. We reserve the right to suspend accounts that violate these terms.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Intellectual Property</h2>
          <p>All content, design, and technology in Sleepzy are owned by ANTS Network. You may not reproduce, distribute, or create derivative works without written permission.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Disclaimer</h2>
          <p>The App is provided "as is" without warranties of any kind. We do not guarantee that sleep tracking data is 100% accurate. Always consult a healthcare professional for medical concerns.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Sleepzy and ANTS Network shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">9. Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of the App after changes constitutes acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">10. Contact</h2>
          <p>For questions about these terms, contact us at <a href="mailto:niketpatil@andsnetwork.com" className="text-drift-accent hover:underline">niketpatil@andsnetwork.com</a></p>
        </section>
      </main>
    </div>
  )
}
