import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Thank you for contacting us. We will get back to you shortly.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="bg-red-50 py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-red-700">
                        Contact Us
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                        Have questions about blood donation or need urgent help?
                        Reach out to us anytime — we are here to help save lives.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-8">

                    <div>
                        <h3 className="text-xl font-semibold text-red-600 mb-4">
                            Get in Touch
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Whether you want to donate blood or request urgent support,
                            feel free to contact us through phone or message.
                        </p>

                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-red-600" />
                                <p>
                                    <span className="font-medium">Emergency Contact:</span>{" "}
                                    <a
                                        href="tel:+8801633029529"
                                        className="text-red-600 hover:underline ml-1"
                                    >
                                        +880 1633 029 529
                                    </a>
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-red-600" />
                                <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    support@lifedrop.org
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-red-600" />
                                <p>
                                    <span className="font-medium">Location:</span>{" "}
                                    Bangladesh
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                required
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Write your message here"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
                        >
                            Send Message
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default ContactUs;
