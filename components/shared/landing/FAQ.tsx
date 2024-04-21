import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section className="max-w-[1440px] mx-auto px-[2rem] mb-[15rem]">
      <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-3xl md:text-5xl text-center mb-[5rem]">
        Frequently Asked Questions<span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">.</span>
      </h2>

      <div className="mx-auto max-w-[800px]">
        {
          accordionData.map(current => (
            <Accordion
              type="single" collapsible className="w-full"
              key={current.question}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>{current.question}</AccordionTrigger>
                <AccordionContent>{current.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        }
      </div>
    </section>
  )
}

const accordionData = [
  {
    question: "What is Toolhance?",
    answer: "Toolhance is a platform that offers a collection of digital tools designed to enhance productivity, organization, and personal growth. Our tools are aimed at helping individuals and teams streamline their workflows, achieve their goals, and maximize their potential."
  },
  {
    question: "How do I get started with Toolhance?",
    answer: "Getting started with Toolhance is easy! Simply visit our website and sign up for an account. Once registered, you'll have access to our suite of tools and can begin exploring how they can benefit you in your daily life or work."
  },
  {
    question: "Are Toolhance's tools free to use?",
    answer: "Yes, Toolhance offers a selection of free tools that users can access and use without any cost. However, we also offer premium features and advanced tools as part of our paid plans for users who require additional functionality and benefits."
  },
  {
    question: "Can I use Toolhance's tools on multiple devices?",
    answer: "Yes, Toolhance's tools are designed to be accessible across multiple devices, including smartphones, tablets, and computers. Simply log in to your Toolhance account from any device with an internet connection to access your tools and data."
  },
  {
    question: "Is my data safe and secure with Toolhance?",
    answer: "Yes, at Toolhance, we take the security and privacy of our users' data very seriously. We implement industry-standard security measures and protocols to ensure that your data is protected against unauthorized access, loss, or theft."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription to Toolhance at any time. Simply visit your account settings and follow the prompts to cancel your subscription. Please note that cancellations may take effect at the end of your current billing period."
  },
  {
    question: "How can I contact customer support for assistance?",
    answer: "If you have any questions, concerns, or need assistance with Toolhance, our customer support team is here to help. You can reach us through our website's contact form or directly via email at support@toolhance.com. We strive to provide prompt and helpful support to all our users."
  },
]