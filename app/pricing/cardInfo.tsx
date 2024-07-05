const perkMessages = [
  "Access to a selection of basic tools",
  "Regular tool updates and improvements",
  "Access to customer support via email",
  "Access to premium tools",
  "Priority customer support",
  "Credit card required",
]

export const cardInfo = [
  {
    header: "Free Tools for Everyone",
    desc: <>
      <p className="mb-2 text-gray-600">
        Get started with our essential toolkit and build something amazing. Free to use forever, no strings attached.<br />
      </p>
      <span className="my-2 font-semibold">
        Includes:
      </span>
    </>,
    perks: [
      { message: perkMessages[0], status: true },
      { message: perkMessages[1], status: true },
      { message: perkMessages[2], status: true },
      { message: perkMessages[3], status: false },
      { message: perkMessages[4], status: false },
      { message: perkMessages[5], status: false },
    ],
    price: "Free Forever",
    href: "/tools"
  },
  {
    header: "Lifetime Access",
    desc: <>
      <p className="mb-2 text-gray-600">
        Pay once, use forever. Gain full ownership of our entire toolkit with a single purchase. Ideal for those who prefer a one-time investment.<br />
      </p>
      <span className="my-2 font-semibold">
        Includes everything in Pro Membership, plus:
      </span>
    </>,
    perks: [
      { message: perkMessages[0], status: true },
      { message: perkMessages[1], status: true },
      { message: perkMessages[2], status: true },
      { message: perkMessages[3], status: true },
      { message: perkMessages[4], status: true },
      { message: perkMessages[5], status: true },
    ],
    price: "$50",
    duration: "one-time payment",
    popular: true,
    href: process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_00gbKw5ix2XdgbSfYZ"
      : "/",
    priceId: "price_1PYB1VI91CBidwrtSbB955BX"
  },
  {
    header: "Pro Membership",
    desc: <>
      <p className="mb-2 text-gray-600">
        Elevate your workflow with our extensive library of professional tools. Perfect for freelancers and growing businesses.<br />
      </p>
      <span className="my-2 font-semibold">
        Includes everything in Free Toolbox, plus:
      </span>
    </>,
    perks: [
      { message: perkMessages[0], status: true },
      { message: perkMessages[1], status: true },
      { message: perkMessages[2], status: true },
      { message: perkMessages[3], status: true },
      { message: perkMessages[4], status: true },
      { message: perkMessages[5], status: true },
    ],
    price: "$5",
    duration: "/month",
    href: process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_4gwg0MfXb55l6BieUU"
      : "/",
    priceId: "price_1PY7vlI91CBidwrtSgmJfS7m"
  },
]

export const accordionData = [
  {
    question: "What is included in the Free Tools for Everyone plan?",
    answer: "The Free Tools for Everyone plan provides access to a curated selection of basic tools that can help you get started with enhancing your productivity. This plan is free to use forever and includes access to customer support via email."
  },
  {
    question: "What additional benefits do I get with the Pro Membership?",
    answer: "The Pro Membership includes access to all available tools on Toolhance, priority customer support, and additional features designed to elevate your workflow. This plan is perfect for freelancers and growing businesses looking for more advanced tools."
  },
  {
    question: "What does the Lifetime Access plan offer?",
    answer: "This plan is literally the same as the Pro Membership plan, but without recurring subscription fees. The Lifetime Access plan allows you to pay once and use all of Toolhance's tools forever."
  },
  {
    question: "What is Customer Portal and where can I find it?",
    answer: "Customer Portal is Stripe's own portal where users can manage their subscription plans. To access Customer Portal, simply visit your account settings, then select the Modify Account tab where you can find the button that takes you there, under the Manage Subscription Plan header."
  },
  {
    question: "Can I upgrade or downgrade my membership plan?",
    answer: "Yes, you can upgrade or downgrade your membership plan at any time through your Customer Portal. Any changes to your subscription will take effect immediately, and any prorated charges or credits will be applied accordingly."
  },
  {
    question: "Can I cancel my membership at any time?",
    answer: "Yes, you can cancel your membership at any time through your Customer Portal. Please note that cancellations will take effect at the end of your current billing period, and you will retain access to the tools and features until then."
  },
  {
    question: "Are there any discounts for annual subscriptions?",
    answer: "Currently, Toolhance offers a monthly pricing plan. We are continuously exploring ways to provide more value to our users, and we may introduce annual subscription discounts in the future. Stay tuned for updates on our pricing page."
  },
  {
    question: "What payment methods does Toolhance accept?",
    answer: "Toolhance accepts various payment methods through Stripe, including major credit cards like Visa, MasterCard, American Express, and others. All payment transactions are processed securely through Stripe to ensure the safety of your financial information."
  },
  {
    question: "What is Toolhance's refund policy?",
    answer: "Toolhance offers a refund policy in accordance with our terms of service. If you are not satisfied with your purchase, please contact our customer support team within 30 days of your purchase date for assistance with a refund or other options."
  },
  {
    question: "How can I contact customer support for billing inquiries?",
    answer: "If you have any billing inquiries or need assistance with your subscription, our customer support team is here to help. You can reach us through our website's contact form or directly via email at support@toolhance.com. We strive to provide prompt and helpful support to all our users."
  },
]

