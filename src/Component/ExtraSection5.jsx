import { motion } from "framer-motion";
import { FaHandsHelping, FaUsers, FaCalendarAlt } from "react-icons/fa";

const Volunteer = () => {
    return (
        <div className="bg-gradient-to-r from-red-50 via-white to-red-50">
            <section className="max-w-6xl mx-auto py-16 px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Become a Volunteer
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Join our community and help save lives beyond blood donation.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl shadow-md">
                        <FaHandsHelping className="text-red-500 text-4xl mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-800">Volunteer Roles</h3>
                        <p className="text-gray-600 text-sm mt-3">
                            Assist donors, manage requests, and support campaigns.
                        </p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl shadow-md">
                        <FaCalendarAlt className="text-red-500 text-4xl mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-800">Community Events</h3>
                        <p className="text-gray-600 text-sm mt-3">
                            Participate in blood drives and awareness programs.
                        </p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl shadow-md">
                        <FaUsers className="text-red-500 text-4xl mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-800">Join the Network</h3>
                        <p className="text-gray-600 text-sm mt-3">
                            Be part of a life-saving community.
                        </p>
                    </motion.div>
                </div>

                <button className="bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-xl font-semibold transition">
                    Join Now
                </button>
            </section>
        </div>
    );
};

export default Volunteer;
