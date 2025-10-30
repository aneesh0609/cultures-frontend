import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and UPI. All transactions are 100% secure using advanced encryption technology.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard delivery takes 3-6 days..",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes, returns are accepted within 30 days of delivery. Items must be unused and in original packaging.",
    },
    {
      question: "How can I track my order?",
      answer:
        "After your order ships, you’ll receive a tracking link via email. .",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gray-700 py-14 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-md mb-3">
            <HelpCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-200 mb-2 star tracking-[0.1em]">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-100 text-sm md:text-base max-w-md mx-auto ">
            Quick answers to the most common queries about our store and products.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-base md:text-lg font-semibold text-gray-800 pr-5">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-4 text-gray-600 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
