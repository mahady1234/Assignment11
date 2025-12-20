import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";

const DonationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [request, setRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/donorRequest/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);



    const handleConfirmDonation = () => {
        axios
            .patch(`http://localhost:5000/donorRequest/${id}`, {
                status: "inprogress"
            })
            .then(res => {
               
                setRequest(res.data); 
                setShowModal(false);  

                toast.success("Donation confirmed successfully! Thank you for saving a life.", {
                    position: "top-center",
                    autoClose: 3000,
                });

              
                navigate('/allDonationRequest');
            })
            .catch(err => {
                console.error(err);
                toast.error("Something went wrong. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                });
            });
    };




    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Donation request not found.
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10 mt-20">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Donation Request Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <p><strong>Recipient Name:</strong> {request.recipientName}</p>
                    <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                    <p><strong>Hospital:</strong> {request.hospital}</p>
                    <p>
                        <strong>Location:</strong>{" "}
                        {request.districtName}, {request.upazilaName}
                    </p>
                    <p><strong>Full Address:</strong> {request.fullAddress}</p>
                    <p><strong>Date:</strong> {request.donationDate}</p>
                    <p><strong>Time:</strong> {request.donationTime}</p>
                    <p className="md:col-span-2">
                        <strong>Message:</strong> {request.message}
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition"
                >
                    Donate Blood
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Confirm Donation
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Donor Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.displayName || user?.name}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Donor Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDonation}
                                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationDetails;











