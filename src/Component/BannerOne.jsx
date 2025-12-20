import React, { useState, useEffect } from 'react';

const slides = [
    {
        id: 1,
        title: "Donate Blood, Save Lives",
        description: "A small act of kindness from you can mean a lifetime for someone else.",
        image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ymxvb2QlMjBkb25hdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 2,
        title: "Be There When It Matters Most",
        description: "Your blood donation can support patients during emergencies and critical care.",
        image: "https://media.istockphoto.com/id/2231648772/photo/woman-hands-holding-a-heart-shape.webp?a=1&b=1&s=612x612&w=0&k=20&c=tnejnAtLvYCkgSloSw2GjhIUw3bJX6tPXwRgw5VBTPE=",
    },
    {
        id: 3,
        title: "",
        description: "",
        image: "https://media.istockphoto.com/id/2249336525/photo/national-blood-donor-month-concept.jpg?s=612x612&w=0&k=20&c=PaBufnj_XIHvYaBrJzZXyN0yQP6Uzm9ptINw-kG1U9E=",
    },
];

const BannerOne = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center relative overflow-hidden bg-gradient-to-r from-red-50 via-white to-red-50">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute w-11/12 sm:w-8/12 h-2/3 sm:h-3/4 rounded-xl shadow-2xl shadow-red-900 transition-opacity duration-1000 flex flex-col justify-start items-center text-center
                        ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className={`mt-6 sm:mt-8 px-4 sm:px-0 transition-all duration-700 transform
                        ${index === current ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
                    >
                        <h2 className="text-2xl sm:text-4xl font-bold mb-2 text-white drop-shadow-md">{slide.title}</h2>
                        <p className="text-sm sm:text-lg text-white drop-shadow-md">{slide.description}</p>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-8 sm:bottom-10 flex gap-2 sm:gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors ${index === current ? "bg-blue-500" : "bg-gray-400"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerOne;
