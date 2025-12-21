



import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Loading from "./Loading";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllDonationRequest = () => {
     const axiosSecure=useAxiosSecure()
    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const limit = 10;

    const fetchRequests = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const res = await axiosSecure.get("/donorRequest", {
                params: { limit, page: pageNumber }
            });
            setRequests(res.data.data);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests(page);
    }, [ page]);

    const handleView = (id) => {
        if (!user) navigate("/authRoot/login");
        else navigate(`/donationDetail/${id}`);
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="bg-gray-100 min-h-screen mt-5 py-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Pending Blood Donation Requests
            </h2>

            <div className="max-w-6xl mx-auto px-4">
                {loading ? (
                    <p className="text-center text-gray-500"><Loading /></p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {requests.map((request) => (
                                <div
                                    key={request._id}
                                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
                                >
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold text-gray-700">
                                            {request.recipientName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {request.hospital}
                                        </p>
                                    </div>

                                    <div className="space-y-2 text-gray-600 text-sm">
                                        <p>
                                            <span className="font-medium">Location:</span>{" "}
                                            {request.districtName}, {request.upazilaName}
                                        </p>
                                        <p>
                                            <span className="font-medium">Blood Group:</span>{" "}
                                            <span className="text-red-700 font-semibold">
                                                {request.bloodGroup}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="font-medium">Date:</span>{" "}
                                            {request.donationDate}
                                        </p>
                                        <p>
                                            <span className="font-medium">Time:</span>{" "}
                                            {request.donationTime}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleView(request._id)}
                                        className="mt-6 w-full py-2.5 rounded-lg bg-red-900 hover:bg-red-700 text-white font-medium transition"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>

                        {requests.length === 0 && (
                            <p className="text-center text-gray-500 mt-16">
                                No pending donation requests found.
                            </p>
                        )}

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-10 gap-3">
                                <button
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                <span className="px-4 py-2">
                                    Page {page} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllDonationRequest;
