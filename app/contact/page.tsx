import ContactContent from "./ContactContent"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toolhance | Contact",
  description: "Contact Toolhance's team here!",
}

export default function Contact() {
  return <ContactContent />
}