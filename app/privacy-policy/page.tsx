import PageHeader from "@/components/shared/other/PageHeader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toolhance | Privacy Policy",
  description: "Toolhance's Privacy Policy",
}

export default function PrivacyPolicy() {
  const companyName = "Toolhance"
  const companyEmail = "contact@toolhance.com"
  const arbitrationOrganization = "Arbitration Organization"

  const lastUpdated = "04/07/2024"

  const companyOwner = "Toolhance Inc."
  const streetAddress = "Something Str. 5"
  const cityData = "Debrecen, 4031"
  const country = "Hungary"

  return (
    <section className="h-full max-w-[1440px] mx-auto px-[2rem] py-[10rem]">
      <PageHeader text="Privacy Policy" />

      <div className="max-w-5xl mx-auto shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8 md:p-10">
          <p className="mb-6">
            Welcome to <b>{companyName}</b>! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect information about you. Please read it carefully.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">1. Information We Collect</h3>
          <p className="mb-1">
            We collect information when you use {companyName}, including:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>By signing up we collect personal information such as name, email address.</li>
            <li>Personal information provided by Google or Facebook if you signed up with Google or Facebook oAuth.</li>
            <li>Usage data, including IP addresses, browser type, and device identifiers.</li>
            <li>Information you voluntarily provide, such as feedback, survey responses or your profile picture.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            2. How We Use Your Information
          </h3>
          <p className="mb-1">
            We use your information to:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Storing personal information such as name, email address to allow you signing in to use {companyName}.</li>
            <li>Provide and improve our services.</li>
            <li>Communicate with you, including customer support.</li>
            <li>Personalize your experience and deliver relevant content.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            3. Information Sharing
          </h3>
          <p className="mb-1">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Service providers who assist in operating our website and services.</li>
            <li>Law enforcement or regulatory authorities when required by law.</li>
          </ul>
          <p className="mb-6">
            We do not sell or rent your personal information to third parties.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">4. Security</h3>
          <p className="mb-4">
            We implement security measures to protect your information. However, no method of transmission over the internet or electronic storage is completely secure.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">5. Your Choices</h3>
          <p className="mb-1">
            You can:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Access and update your personal information.</li>
            <li>Opt-out of receiving promotional emails.</li>
            <li>Request deletion of your account, subject to legal and contractual obligations.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">6. Changes to This Policy</h3>
          <p className="mb-1">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">7. Contact Us</h3>
          <p className="mb-6">
            If you have questions or concerns about this Privacy Policy, please contact us at <a href={`mailto:${companyEmail}`} className="text-blue-500">{companyEmail}</a>.
          </p>

          <p className="mt-8 text-sm text-gray-500">
            This Privacy Policy was last updated on {lastUpdated}.<br />
            For previous versions of this Privacy Policy, please contact {companyName} Inc. at the following address:
          </p>
          <p className="text-sm text-gray-500 ml-2">
            {companyOwner}<br />
            {streetAddress}<br />
            {cityData}<br />
            {country}
          </p>
        </div>
      </div>
    </section>
  )
}