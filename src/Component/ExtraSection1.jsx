import { motion } from "framer-motion";
import { FaHeart, FaUsers, FaTint } from "react-icons/fa";

const whyDonate = [
  {
    id: 1,
    icon: <FaHeart />,
    title: "Save Lives",
    text: "One blood donation can help save up to three lives in emergency situations."
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: "Support the Community",
    text: "Blood donation connects people and strengthens our community support system."
  },
  {
    id: 3,
    icon: <FaTint />,
    title: "Always in Need",
    text: "Hospitals need blood every day for surgeries, accidents, and critical patients."
  }
];

const WhyDonateBlood = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 via-white to-red-50">
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Why Donate Blood?
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          A simple act of kindness can make a life-saving difference.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {whyDonate.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <div className="text-red-500 text-4xl flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mt-3">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyDonateBlood;
