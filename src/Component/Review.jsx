import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const stories = [
    {
        id: 1,
        name: "Aisha Rahman",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        text: "Through this platform, I was able to donate blood during an emergency. Knowing it helped save a life is priceless."
    },
    {
        id: 2,
        name: "Imran Hossain",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80",
        rating: 4,
        text: "I quickly found a donor for my cousin. The response was fast and the process felt trustworthy."
    },
    {
        id: 3,
        name: "Sadia Akter",
        image: "https://images.unsplash.com/photo-1648743856421-5bc9a742ddc5?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        text: "This platform connects real people who genuinely want to help. It made blood donation much easier."
    }
];

const Review = () => {
    return (
        <div className="bg-gradient-to-r from-red-50 via-white to-red-50">
            <section className="max-w-6xl mx-auto py-10 px-4 " >
                <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                    Stories That Inspire
                </h2>

                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                    Real experiences from donors and receivers who came together to save lives.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{ scale: 1.04 }}
                            className="bg-white p-6 rounded-2xl shadow-md text-center"
                        >
                            <img
                                src={story.image}
                                alt={story.name}
                                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-red-200"
                            />

                            <h3 className="font-semibold text-lg text-gray-800">
                                {story.name}
                            </h3>

                            <div className="flex justify-center items-center gap-1 mt-2 text-yellow-400">
                                {Array.from({ length: story.rating }).map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                            <p className="text-gray-600 text-sm mt-4">
                                {story.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Review;
