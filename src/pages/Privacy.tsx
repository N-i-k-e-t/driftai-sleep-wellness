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
        <p className="text-drift-muted text-sm">This Privacy Policy describes how <strong className="text-white">Algeina Technology LLP</strong> (also known as <strong className="text-white">ANTS Network</strong>), a Limited Liability Partnership registered under the laws of India (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), collects, uses, stores, and protects your personal information when you use Sleepzy (&quot;App&quot; or &quot;Service&quot;). This Policy is compliant with the Information Technology Act, 2000, the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDP Act). By using Sleepzy, you consent to the practices described in this Policy.</p>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Data Controller</h2>
          <p>The data controller responsible for your personal information is <strong className="text-white">Algeina Technology LLP</strong> (operating as ANTS Network), which owns and operates Sleepzy. For all data-related queries, contact our Grievance Officer at <a href="mailto:privacy@andsnetwork.com" className="text-drift-accent">privacy@andsnetwork.com</a>.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. Information We Collect</h2>
          <p>We collect the following categories of information:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong className="text-white">Account Data:</strong> Email address, name, and password (stored encrypted) provided during registration.</li>
            <li><strong className="text-white">Sleep &amp; Health Data (Sensitive):</strong> Sleep logs, bedtime/wake-time records, mood entries, and wellness metrics you voluntarily enter.</li>
            <li><strong className="text-white">Usage Data:</strong> App interaction patterns, feature usage, session duration, device type, operating system, and browser information.</li>
            <li><strong className="text-white">Payment Data:</strong> Billing information processed by our payment gateway partners. We do not store full card details on our servers.</li>
            <li><strong className="text-white">Communication Data:</strong> Any messages or feedback you send to our support team.</li>
            <li><strong className="text-white">Technical Data:</strong> IP address, cookies, log data, and session tokens used for authentication and security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. How We Use Your Information</h2>
          <p>We use your information for the following lawful purposes:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>To provide, personalise, and improve the Sleepzy Service and AI-powered insights.</li>
            <li>To process subscription payments and manage your account.</li>
            <li>To send service-related communications (account alerts, security notices, billing receipts).</li>
            <li>To send product updates or offers — you may opt out at any time.</li>
            <li>To analyse anonymised, aggregated usage trends to improve the App.</li>
            <li>To comply with legal obligations under applicable Indian law.</li>
            <li>To detect, investigate, and prevent fraud or security incidents.</li>
          </ul>
          <p className="mt-2">We <strong className="text-white">do not sell, rent, or trade</strong> your personal data to third parties for their marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Sensitive Personal Data</h2>
          <p>Sleep tracking data, mood logs, and wellness metrics constitute Sensitive Personal Data or Information (SPDI) under Indian law. We collect this data only with your explicit consent. This data is used solely to generate your personalised sleep insights within the App and is not disclosed to any third party except as required by law or with your express consent.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Data Storage &amp; Security</h2>
          <p>Your data is stored on Supabase cloud infrastructure with encryption at rest (AES-256) and in transit (TLS 1.2+). Algeina Technology LLP implements industry-standard security measures including access controls, audit logs, and regular security assessments. While we take all reasonable precautions, no system is completely secure, and we cannot guarantee absolute security of your data. In the event of a data breach affecting your rights, we will notify you within 72 hours as required by applicable law.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Data Retention</h2>
          <p>We retain your personal data for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymise your personal data within 30 days, except where retention is required for legal, tax, or compliance purposes (typically up to 7 years for financial records). Anonymised, aggregated data may be retained indefinitely for analytical purposes.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Third-Party Service Providers</h2>
          <p>We share data with trusted third-party providers solely to operate the Service:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong className="text-white">Supabase</strong> — Authentication &amp; database (privacy policy: supabase.com/privacy)</li>
            <li><strong className="text-white">Vercel</strong> — App hosting (privacy policy: vercel.com/legal/privacy-policy)</li>
            <li><strong className="text-white">Payment Gateway Partners</strong> — Secure payment processing</li>
          </ul>
          <p className="mt-2">These providers are contractually bound to handle your data only as instructed by us and in compliance with applicable law. We do not share your data with advertisers or data brokers.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">8. Cookies &amp; Local Storage</h2>
          <p>Sleepzy uses essential cookies and local storage to maintain your login session and app preferences. We do not use third-party tracking or advertising cookies. You can clear cookies via your browser settings, though this may affect App functionality. We do not use cross-site tracking technologies.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">9. Your Rights as a Data Principal</h2>
          <p>Under the DPDP Act, 2023 and applicable Indian law, you have the right to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong className="text-white">Access</strong> your personal data held by us.</li>
            <li><strong className="text-white">Correction</strong> of inaccurate or incomplete personal data.</li>
            <li><strong className="text-white">Erasure</strong> of your personal data (Right to be Forgotten), subject to legal retention obligations.</li>
            <li><strong className="text-white">Withdraw Consent</strong> at any time, without affecting lawfulness of prior processing.</li>
            <li><strong className="text-white">Data Portability</strong> — request a copy of your data in a machine-readable format.</li>
            <li><strong className="text-white">Nomination</strong> — nominate a person to exercise rights on your behalf in case of death or incapacity.</li>
            <li><strong className="text-white">Grievance Redressal</strong> — raise complaints with our Grievance Officer.</li>
          </ul>
          <p className="mt-2">To exercise these rights, email <a href="mailto:privacy@andsnetwork.com" className="text-drift-accent">privacy@andsnetwork.com</a>. We will respond within 30 days.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">10. Children&apos;s Privacy</h2>
          <p>Sleepzy is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided personal data, we will delete it immediately. Parents or guardians who believe a minor has registered should contact us at <a href="mailto:privacy@andsnetwork.com" className="text-drift-accent">privacy@andsnetwork.com</a>.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">11. Cross-Border Data Transfers</h2>
          <p>Your data may be processed on servers located outside India (for hosting and infrastructure purposes). Algeina Technology LLP ensures such transfers comply with applicable Indian data protection laws, including ensuring adequate safeguards are in place at the recipient&apos;s end.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically to reflect changes in law, technology, or our practices. Material changes will be communicated via in-app notification or email at least 14 days before they take effect. The date at the top of this page reflects the most recent revision. Your continued use of the App after such changes constitutes acceptance of the updated Policy.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">13. Grievance Officer</h2>
          <p>In accordance with the IT Act, 2000 and DPDP Act, 2023, our Grievance Officer is:<br />
          <strong className="text-white">Name:</strong> Niket Patil<br />
          <strong className="text-white">Organisation:</strong> Algeina Technology LLP (ANTS Network)<br />
          <strong className="text-white">Email:</strong> <a href="mailto:privacy@andsnetwork.com" className="text-drift-accent">privacy@andsnetwork.com</a><br />
          Complaints will be acknowledged within 48 hours and resolved within 30 days.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">14. Contact Us</h2>
          <p>For any privacy-related questions or requests:<br />
          <strong className="text-white">Algeina Technology LLP</strong> (operating as ANTS Network)<br />
          <a href="mailto:privacy@andsnetwork.com" className="text-drift-accent">privacy@andsnetwork.com</a><br />
          Website: <a href="https://www.andsnetwork.com" className="text-drift-accent">www.andsnetwork.com</a></p>
        </section>
      </main>
    </div>
  )
}
