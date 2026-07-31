import Accordion from "@/components/ui/Accordion";

const accordionData = [
  {
    title: "What is your return policy?",
    description:
      "You can return any item within 30 days of purchase for a full refund. Please ensure the item is in its original condition and packaging.",
  },
  {
    title: "How long does shipping take?",
    description:
      "Shipping typically takes 5-7 business days for domestic orders and 10-15 business days for international orders.",
  },
  {
    title: "Can I change or cancel my order?",
    description:
      "You can change or cancel your order within 24 hours of placing it. Please contact our customer service team for assistance.",
  },
  {
    title: "Do you offer gift wrapping?",
    description:
      "Yes, we offer gift wrapping for an additional fee at checkout. You can choose from a variety of wrapping options.",
  },
  {
    title: "What payment methods do you accept?",
    description:
      "We accept all major credit cards, PayPal, and Apple Pay for your convenience.",
  },
];

export default function AccordionPreview() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
          Frequently Asked Questions
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Everything you need to know about the product and billing.
        </p>
      </div>
      <Accordion items={accordionData} />
    </div>
  );
}
