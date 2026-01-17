import { motion } from "framer-motion";
import { FaUser, FaWeight, FaHeartbeat, FaTint } from "react-icons/fa";

const eligibility = [
  {
    id: 1,
    icon: <FaUser />,
    title: "Age Requirement",
    text: "Donors must be between 18 and 60 years old."
  },
  {
    id: 2,
    icon: <FaWeight />,
    title: "Minimum Weight",
    text: "Donors should weigh at least 50 kg for safe donation."
  },
  {
    id: 3,
    icon: <FaHeartbeat />,
    title: "Good Health",
    text: "Donors should be healthy and free from serious illnesses."
  },
  {
    id: 4,
    icon: <FaTint />,
    title: "All Blood Groups",
    text: "People of all blood groups can donate and help save lives."
  }
];

const WhoCanDonate = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 via-white to-red-50">
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Who Can Donate?
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Check if you are eligible to become a blood donor.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {eligibility.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <div className="text-red-500 text-3xl flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-gray-800">
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

export default WhoCanDonate;
