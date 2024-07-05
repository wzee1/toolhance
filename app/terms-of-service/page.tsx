import PageHeader from "@/components/shared/other/PageHeader"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Toolhance | Terms of Service",
  description: "Toolhance's Terms of Service",
}

export default function TermsOfService() {
  const companyName = "Toolhance"
  const companyEmail = "contact@toolhance.com"
  const arbitrationOrganization = "Arbitration Organization"

  const lastUpdated = "July 4th, 2024"

  const companyOwner = "Toolhance Inc."
  const streetAddress = "Something Str. 5"
  const cityData = "Debrecen, 4031"
  const country = "Hungary"

  const serviceDesc = "Toolhance provides a variety of tools and resources designed to streamline workflows, improve efficiency, and foster collaboration among users. We may modify or discontinue services at any time without notice."

  return (
    <section className="h-full max-w-[1440px] mx-auto px-[2rem] py-[10rem]">
      <PageHeader text="Terms of Service" />

      <div className="max-w-5xl mx-auto shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8 md:p-10">
          <p className="mb-6">
            Welcome to <b>{companyName}</b>! By using our website and services, you agree to these terms. Please read them carefully.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            1. Acceptance of Terms
          </h3>
          <p className="mb-4">
            By accessing and using {companyName}, you agree to be bound by these Terms of Service, our <u><Link href="/privacy-policy">Privacy Policy</Link></u>, and any additional terms and conditions that apply to specific services.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            2. Definitions
          </h3>
          <ul className="list-disc list-inside mb-6">
            <li>
              <b>{companyName}</b>: {companyName} is an online platform that connects users with tools and resources for enhancing productivity.
            </li>
            <li>
              <b>User</b>: Any individual or organization accessing {companyName}.
            </li>
            <li>
              <b>Content</b>: Refers to all text, images, videos, and other materials uploaded, downloaded, or appearing on {companyName}.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            3. User Responsibilities
          </h3>
          <p className="mb-1">
            Users agree not to:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Violate any applicable laws or regulations.</li>
            <li>Upload or share any malicious software or spam content.</li>
            <li>Engage in fraudulent activities or impersonate others.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            4. Service Description
          </h3>
          <p className="mb-4">{serviceDesc}</p>
          
          <h3 className="text-lg font-semibold mt-6 mb-2">
            5. User Accounts
          </h3>
          <p className="mb-4">
            Users must create an account to access certain features of {companyName}. Account credentials must be kept confidential, and account sharing is strictly prohibited. Users are responsible for all activities that occur under their account.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            6. Content Ownership
          </h3>
          <p className="mb-4">
            Users retain ownership of any content they upload or share on {companyName}. By posting content, users grant {companyName} a non-exclusive, royalty-free license to use, reproduce, modify, and distribute the content for the purposes of operating and promoting the platform.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            7. Payments and Fees
          </h3>
          <p className="mb-4">
            Some features or services on {companyName} may require payment. Payment terms and conditions will be clearly communicated at the time of purchase. Toolhance reserves the right to change pricing and payment terms at any time.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            8. <u><Link href="/privacy-policy">Privacy Policy</Link></u>
          </h3>
          <p className="mb-4">
            Our Privacy Policy explains how we collect, use, and protect user information. By using {companyName}, you consent to the collection and use of your data as outlined in our Privacy Policy.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            9. Intellectual Property
          </h3>
          <p className="mb-4">
            {companyName} retains all rights, title, and interest in and to the platform and its intellectual property. Users must obtain permission before using any of {companyName}&apos;s trademarks, logos, or copyrighted materials.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            10. Termination
          </h3>
          <p className="mb-4">
            Toolhance may suspend or terminate user accounts that violate these Terms of Service or engage in prohibited activities. Users may also choose to terminate their accounts at any time by following the account closure procedures provided by Toolhance.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            11. Dispute Resolution
          </h3>
          <p className="mb-4">
            Any disputes arising out of or relating to these Terms of Service will be resolved through binding arbitration in accordance with the rules of {arbitrationOrganization}, with the proceedings conducted in {cityData}.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            12. Changes to Terms of Service
          </h3>
          <p className="mb-4">
            {companyName} reserves the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting to the {companyName} website. Continued use of {companyName} after such changes constitutes acceptance of the updated Terms of Service.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">
            13. Contact Us
          </h3>
          <p className="mb-6">
            If you have any questions or concerns about these Terms of Service, please contact us at <a href={`mailto:${companyEmail}`} className="text-blue-500">{companyEmail}</a>.
          </p>

          <p className="mt-8 text-sm text-gray-500">
            This document was last updated on {lastUpdated}.<br />
            For previous versions of these Terms of Service, please contact {companyName} Inc. at the following address:
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
