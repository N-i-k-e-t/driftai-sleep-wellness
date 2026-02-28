import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-drift-bg text-white">
      <header className="px-6 py-4 flex items-center gap-4 max-w-3xl mx-auto">
        <Link to="/" className="text-drift-muted hover:text-white transition"><ArrowLeft size={20} /></Link>
        <h1 className="text-xl font-bold">Terms &amp; Conditions</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 pb-20 space-y-6 text-drift-muted text-sm leading-relaxed">
        <p className="text-xs">Last updated: March 1, 2026</p>
        <p className="text-drift-muted text-sm">These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of Sleepzy (&quot;App&quot; or &quot;Service&quot;), a product of <strong className="text-white">Algeina Technology LLP</strong> (also operating as <strong className="text-white">ANTS Network</strong>), a Limited Liability Partnership registered under the laws of India (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By using Sleepzy, you confirm that you are at least 18 years of age and agree to be bound by these Terms. If you do not agree, do not access or use the App.</p>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Acceptance of Terms</h2>
          <p>By creating an account, downloading, accessing, or otherwise using the Sleepzy App, you expressly accept and agree to be bound by these Terms and our Privacy Policy. These Terms constitute a legally binding agreement between you and Algeina Technology LLP. If you are accessing the App on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. Description of Service</h2>
          <p>Sleepzy is an AI-powered sleep wellness application that provides sleep tracking, ambient soundscapes, sleep analytics, and personalised recommendations. The App is operated by Algeina Technology LLP under the ANTS Network brand. <strong className="text-white">The App is not a medical device and is not intended to diagnose, treat, cure, or prevent any medical condition.</strong> It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional regarding any sleep-related health concerns.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. Eligibility &amp; User Accounts</h2>
          <p>You must be at least 18 years of age to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are solely responsible for safeguarding your account credentials and for all activities under your account. You must notify us immediately at <a href="mailto:legal@andsnetwork.com" className="text-drift-accent">legal@andsnetwork.com</a> of any unauthorised use of your account. Algeina Technology LLP shall not be liable for any losses resulting from unauthorised account access due to your failure to maintain credential security.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Subscription, Billing &amp; Payments</h2>
          <p>Sleepzy offers a 3-day free trial. After the trial period, continued use requires a paid subscription at Rs. 199/month or Rs. 1,499/year (prices inclusive of applicable taxes). Subscriptions automatically renew at the end of each billing cycle unless cancelled at least 24 hours before the renewal date via your Profile settings. We reserve the right to modify pricing with 30 days&apos; prior notice. Payments are processed securely through third-party payment gateways. By providing payment details, you authorise us to charge your chosen payment method for the applicable subscription fee.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Refund Policy</h2>
          <p>All subscription fees are non-refundable except as expressly required by applicable law. In the event of a technical error directly attributable to Algeina Technology LLP that prevents access to the Service, we may, at our sole discretion, offer a pro-rated credit or refund. Refund requests must be submitted within 7 days of the billing date to <a href="mailto:support@andsnetwork.com" className="text-drift-accent">support@andsnetwork.com</a>. Free trial periods are not eligible for refunds. We comply with the Consumer Protection Act, 2019 (India) where applicable.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Permitted Use &amp; User Conduct</h2>
          <p>You agree to use the App solely for personal, non-commercial purposes. You must not: (a) reverse engineer, decompile, disassemble, or derive source code from the App; (b) reproduce, distribute, publicly display, or create derivative works of any App content without written permission; (c) use the App to transmit harmful, offensive, or unlawful content; (d) circumvent security measures or attempt unauthorised access to our systems; (e) use automated bots, scrapers, or similar tools to access the App; (f) impersonate any person or entity; or (g) use the App in any way that violates applicable law including the Information Technology Act, 2000 and rules thereunder.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Intellectual Property</h2>
          <p>All content, features, functionality, design, technology, trademarks, service marks, and logos of Sleepzy — including but not limited to the name &quot;Sleepzy&quot;, the ANTS Network brand, and all proprietary algorithms — are exclusively owned by or licensed to Algeina Technology LLP. Nothing in these Terms grants you any right, title, or interest in our intellectual property. Any unauthorised use constitutes infringement and may result in legal action under the Copyright Act, 1957, Trade Marks Act, 1999, and other applicable laws.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">8. User-Generated Content</h2>
          <p>Any data, feedback, or content you submit through the App (&quot;User Content&quot;) remains your property. By submitting User Content, you grant Algeina Technology LLP a worldwide, royalty-free, non-exclusive licence to use, process, and analyse such content solely to provide and improve the Service. We do not claim ownership of your personal sleep data. You represent that your User Content does not infringe any third-party rights.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">9. Disclaimers &amp; Limitation of Liability</h2>
          <p>THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. ALGEINA TECHNOLOGY LLP DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR AGGREGATE LIABILITY FOR ANY CLAIMS ARISING FROM YOUR USE OF THE APP SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE 3 MONTHS PRECEDING THE CLAIM. WE SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">10. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless Algeina Technology LLP, its partners, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with: (a) your use of the App; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) any User Content you submit.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">11. Termination</h2>
          <p>We reserve the right to suspend or terminate your account and access to the App at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. Upon termination, your right to use the App ceases immediately. Sections 7, 9, 10, and 12 of these Terms shall survive termination. You may cancel your account at any time from your Profile settings.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">12. Governing Law &amp; Dispute Resolution</h2>
          <p>These Terms are governed by the laws of India. Any disputes arising from or relating to these Terms or the App shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, with the seat of arbitration at Nashik, Maharashtra, India. The courts of Nashik, Maharashtra shall have exclusive jurisdiction for matters not subject to arbitration.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">13. Changes to Terms</h2>
          <p>Algeina Technology LLP reserves the right to modify these Terms at any time. Material changes will be communicated via in-app notification or email at least 14 days before taking effect. Your continued use of the App after the effective date constitutes your acceptance of the revised Terms. We recommend reviewing these Terms periodically.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">14. Grievance Officer</h2>
          <p>In accordance with the Information Technology Act, 2000 and the IT (Intermediary Guidelines) Rules, the details of the Grievance Officer are:<br />
          <strong className="text-white">Name:</strong> Niket Patil<br />
          <strong className="text-white">Organisation:</strong> Algeina Technology LLP (ANTS Network)<br />
          <strong className="text-white">Email:</strong> <a href="mailto:legal@andsnetwork.com" className="text-drift-accent">legal@andsnetwork.com</a><br />
          Complaints will be acknowledged within 48 hours and resolved within 30 days.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">15. Contact Us</h2>
          <p>For any questions regarding these Terms, contact us at:<br />
          <strong className="text-white">Algeina Technology LLP</strong> (operating as ANTS Network)<br />
          <a href="mailto:legal@andsnetwork.com" className="text-drift-accent">legal@andsnetwork.com</a><br />
          Website: <a href="https://www.andsnetwork.com" className="text-drift-accent">www.andsnetwork.com</a></p>
        </section>
      </main>
    </div>
  )
}
