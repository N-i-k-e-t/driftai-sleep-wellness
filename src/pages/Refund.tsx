import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Refund() {
  return (
    <div className="min-h-screen bg-drift-bg text-white">
      <header className="px-6 py-4 flex items-center gap-4 max-w-3xl mx-auto">
        <Link to="/" className="text-drift-muted hover:text-white transition"><ArrowLeft size={20} /></Link>
        <h1 className="text-xl font-bold">Refund &amp; Cancellation Policy</h1>
      </header>
      <main className="max-w-3xl mx-auto px-6 pb-20 space-y-6 text-drift-muted text-sm leading-relaxed">
        <p className="text-xs">Last updated: March 1, 2026</p>
        <p>This Refund &amp; Cancellation Policy (&quot;Policy&quot;) applies to all subscriptions and purchases made on Sleepzy, a product of <strong className="text-white">Algeina Technology LLP</strong> (operating as <strong className="text-white">ANTS Network</strong>). Please read this Policy carefully before subscribing.</p>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Free Trial</h2>
          <p>New users are entitled to a 3-day free trial. No payment is required during the trial period. You may cancel before the trial ends to avoid being charged. Free trial periods are not eligible for any refund as no payment is collected.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. Subscription Plans</h2>
          <p>Sleepzy offers two paid subscription plans:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong className="text-white">Monthly Plan:</strong> Rs. 199/month, billed every 30 days.</li>
            <li><strong className="text-white">Yearly Plan:</strong> Rs. 1,499/year, billed annually (saves 37%).</li>
          </ul>
          <p className="mt-2">All prices are inclusive of applicable GST. Subscriptions auto-renew at the end of each billing cycle unless cancelled in advance.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. General Refund Policy</h2>
          <p>All subscription fees are <strong className="text-white">non-refundable</strong> once charged, except in the following circumstances:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong className="text-white">Technical Failure:</strong> If Sleepzy is completely inaccessible for more than 72 consecutive hours due to a fault on our end, you may be eligible for a pro-rated credit for the affected days.</li>
            <li><strong className="text-white">Duplicate Charge:</strong> If you were charged more than once for the same subscription period due to a billing error, the duplicate charge will be fully refunded.</li>
            <li><strong className="text-white">Statutory Rights:</strong> Where applicable law mandates a refund (e.g., under the Consumer Protection Act, 2019), we will comply accordingly.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. How to Request a Refund</h2>
          <p>To submit a refund request:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Email <a href="mailto:support@andsnetwork.com" className="text-drift-accent">support@andsnetwork.com</a> within <strong className="text-white">7 days</strong> of the billing date.</li>
            <li>Include your registered email address, subscription plan, transaction ID, and the reason for your request.</li>
            <li>Our team will acknowledge your request within 48 hours and respond with a decision within 7 business days.</li>
          </ul>
          <p className="mt-2">Approved refunds will be credited to the original payment method within 7-10 business days, subject to your bank&apos;s processing times.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Cancellation Policy</h2>
          <p>You may cancel your subscription at any time from your Profile settings within the App. Upon cancellation:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your access to premium features will continue until the end of the current billing period.</li>
            <li>No further charges will be made after the current billing period ends.</li>
            <li>Cancellation does not automatically trigger a refund for the current billing period.</li>
            <li>Your account and data will be retained for 30 days after cancellation, after which you may request deletion.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Plan Upgrades &amp; Downgrades</h2>
          <p>If you upgrade from a Monthly to a Yearly plan, any unused portion of your current monthly cycle will be credited as a pro-rated discount on your yearly plan. Downgrades take effect at the start of the next billing cycle. No refunds are issued for plan changes.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Chargebacks</h2>
          <p>If you initiate a chargeback with your bank or payment provider without first contacting us, we reserve the right to suspend or permanently terminate your account. We encourage you to contact our support team first so we can resolve issues promptly and amicably.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">8. Changes to This Policy</h2>
          <p>Algeina Technology LLP reserves the right to modify this Policy at any time. Updated versions will be posted on this page with the revised date. Continued use of the App after changes are posted constitutes acceptance of the revised Policy.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">9. Contact Us</h2>
          <p>For any refund or cancellation queries:<br />
          <strong className="text-white">Algeina Technology LLP</strong> (ANTS Network)<br />
          <a href="mailto:support@andsnetwork.com" className="text-drift-accent">support@andsnetwork.com</a><br />
          We aim to resolve all queries within 7 business days.</p>
        </section>
      </main>
    </div>
  )
}
