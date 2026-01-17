import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Is blood donation safe?",
    answer:
      "Yes, blood donation is completely safe. Sterile and disposable equipment is used for every donor to prevent any risk of infection."
  },
  {
    question: "Does donating blood hurt?",
    answer:
      "You may feel a small pinch when the needle is inserted, but the process is mostly painless and lasts only a few minutes."
  },
  {
    question: "How long does the donation process take?",
    answer:
      "The entire process usually takes 30–45 minutes, while the actual blood donation takes only 8–10 minutes."
  },
  {
    question: "How often can I donate blood?",
    answer:
      "A healthy person can donate blood every 3–4 months, depending on medical guidelines."
  }
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-gradient-to-r from-red-50 mt-20 via-white to-red-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-5 cursor-pointer"
              onClick={() => setActive(active === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`transition-transform ${
                    active === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {active === index && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600 mt-3 text-sm"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
