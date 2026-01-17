import { motion } from "framer-motion";

const blogs = [
    {
        title: "Why Regular Blood Donation Matters",
        desc:
            "Regular blood donation helps hospitals maintain emergency blood supplies and saves countless lives every day.",
        date: "March 2026"
    },
    {
        title: "Health Benefits of Donating Blood",
        desc:
            "Donating blood can improve heart health, stimulate new blood cell production, and reduce harmful iron levels.",
        date: "February 2026"
    },
    {
        title: "Emergency Blood Requests: What You Should Know",
        desc:
            "Understanding emergency blood needs can help you respond faster and make a life-saving impact.",
        date: "January 2026"
    },
    {
        title: "Preparing Yourself for Blood Donation",
        desc:
            "Learn how to prepare before donating blood to ensure a smooth and safe donation experience.",
        date: "December 2025"
    }
];

const BlogNews = () => {
    return (
        <section className="py-16 mt-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Health Tips & News
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ scale: 1.03 }}
                            className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition bg-gradient-to-br from-red-50 to-white"
                        >
                            <p className="text-sm text-red-600 mb-2">{blog.date}</p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {blog.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {blog.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogNews;
