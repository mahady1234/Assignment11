import { motion } from "framer-motion";
import { FaHeartbeat, FaUsers, FaNewspaper } from "react-icons/fa";

const About = () => {
    return (
        <div className="bg-gradient-to-r mt-20 from-red-50 via-white to-red-50">

            <section className="max-w-6xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <FaHeartbeat className="text-red-600 text-5xl mx-auto mb-4" />

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        About Our Mission
                    </h1>

                    <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                        We are a community-driven blood donation platform dedicated to saving lives.
                        Our goal is to connect voluntary blood donors with people in urgent need,
                        making the process fast, transparent, and trustworthy.
                        Every drop of blood donated through our platform represents hope, care,
                        and humanity.
                    </p>
                </motion.div>
            </section>

            <section className="bg-white py-14 border-y">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto px-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FaNewspaper className="text-red-600 text-3xl" />
                        <span className="uppercase tracking-widest text-sm text-red-600 font-semibold">
                            Breaking News
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
                        “One Blood Donation Can Save Up to Three Lives — Communities Are Stepping Up”
                    </h2>

                    <p className="mt-5 text-gray-600 max-w-4xl text-lg">
                        Across cities and villages, ordinary people are becoming everyday heroes
                        by donating blood. Our platform has helped hundreds of patients receive
                        timely support during emergencies, surgeries, and critical treatments.
                        This growing movement proves that small actions can create life-changing impact.
                    </p>
                </motion.div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-10 items-center"
                >
                    <div>
                        <FaUsers className="text-red-600 text-5xl mb-4" />

                        <h2 className="text-3xl font-bold text-gray-800">
                            Our Community & Vision
                        </h2>

                        <p className="mt-5 text-gray-600 text-lg leading-relaxed">
                            We believe blood donation should be easy, safe, and accessible for everyone.
                            Our community includes donors, volunteers, medical professionals, and
                            organizations working together to ensure no life is lost due to blood shortage.
                            In the future, we aim to expand nationwide and build a stronger,
                            faster emergency response network.
                        </p>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-red-100 p-8 rounded-2xl shadow"
                    >
                        <h3 className="text-2xl font-semibold text-red-700 mb-3">
                            Why We Exist
                        </h3>

                        <ul className="space-y-3 text-gray-700 text-lg list-disc list-inside">
                            <li>To reduce emergency blood shortages</li>
                            <li>To connect real donors with real patients</li>
                            <li>To build awareness and trust in blood donation</li>
                            <li>To create a life-saving digital community</li>
                        </ul>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default About;
