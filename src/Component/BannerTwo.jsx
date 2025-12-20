import { useNavigate } from "react-router-dom";
import Banner from "./Banner";

const BannerTwo = () => {
    const navigate = useNavigate();

    return (
        
        <section className="bg-gradient-to-r from-red-50 via-white to-red-50 py-4">
            <Banner ></Banner>
            <div className="max-w-6xl mx-auto px-6 pb-8 grid md:grid-cols-2 gap-10 items-center mt-8">

                {/* Text Content */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        Donate Blood, <span className="text-red-600">Save Lives</span>
                    </h1>

                    <p className="mt-5 text-gray-600 text-lg">
                        Become a hero by donating blood or find nearby donors instantly.
                        A simple step from you can make a big difference for someone in need.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <button
                            onClick={() => navigate("/authRoot/register")}
                            className="px-6 py-3 bg-red-900 text-white font-medium rounded-lg hover:bg-red-700 transition"
                        >
                            Join as a Donor
                        </button>

                        <button
                            onClick={() => navigate("/search")}
                            className="px-6 py-3 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-50 transition"
                        >
                            Search Donors
                        </button>
                    </div>
                </div>

                {/* Image / Illustration */}
                <div className="flex justify-center">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1723114841540-0189f6449713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGJsb29kJTIwZG9uYXRpb258ZW58MHx8MHx8fDA%3D"
                        alt="Blood Donation"
                        className="max-w-sm w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default BannerTwo;
