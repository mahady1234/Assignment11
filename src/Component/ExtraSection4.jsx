import { motion } from "framer-motion";
import { FaUserPlus, FaStethoscope, FaTint, FaSmile } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "Registration",
    text: "Sign up and provide basic personal and health information."
  },
  {
    id: 2,
    icon: <FaStethoscope />,
    title: "Health Check",
    text: "A quick health screening ensures safe donation."
  },
  {
    id: 3,
    icon: <FaTint />,
    title: "Donation",
    text: "Blood is collected safely by trained professionals."
  },
  {
    id: 4,
    icon: <FaSmile />,
    title: "Recovery",
    text: "Rest for a short time and enjoy refreshments."
  }
];

const DonationProcess = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 via-white to-red-50">
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Donation Process
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Simple steps to ensure a safe and comfortable donation experience.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <div className="text-red-500 text-4xl flex justify-center mb-4">
                {step.icon}
              </div>

              <h3 className="font-semibold text-gray-800">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm mt-3">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DonationProcess;
