


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const DonationRequestView = () => {
     const axiosSecure=useAxiosSecure()
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure
            .get(`/donorRequest/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <p className="text-center py-16 text-gray-500">
                Loading donation request details...
            </p>
        );
    }

    if (!request) {
        return (
            <p className="text-center py-16 text-red-500">
                Donation request not found
            </p>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                    Donation Request Details
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Complete information of the blood donation request
                </p>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
                <Info label="Recipient Name" value={request.recipientName} />

                <Info
                    label="Location"
                    value={`${request.upazila}, ${request.district}`}
                />

                <Info label="Hospital" value={request.hospital} />
                <Info label="Full Address" value={request.fullAddress} />
                <Info label="Blood Group" value={request.bloodGroup} />

                <Info
                    label="Donation Schedule"
                    value={`${request.donationDate} at ${request.donationTime}`}
                />

                <Info
                    label="Status"
                    value={request.status}
                    badge
                />

                <Info
                    label="Message"
                    value={request.message || "No message provided"}
                />

                {/* Back Button */}
                <div className="pt-6 text-right">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center px-4 py-2 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-900 transition"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Info = ({ label, value, badge }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <p className="w-44 font-medium text-gray-600">
                {label}
            </p>

            {badge ? (
                <span className="capitalize px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 w-fit">
                    {value}
                </span>
            ) : (
                <p className="text-gray-800 break-words">
                    {value}
                </p>
            )}
        </div>
    );
};

export default DonationRequestView;
