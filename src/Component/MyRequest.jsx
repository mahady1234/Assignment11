import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Loading from "./Loading";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyRequest = () => {
    const { user } = useContext(AuthContext);
     const axiosSecure=useAxiosSecure()
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const fetchRequests = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await axiosSecure.get("/my-donation-requests", {
                params: { email: user.email, status: statusFilter, page, limit },
            });
            setRequests(res.data.requests);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("Error fetching donation requests:", err.message);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [user, statusFilter, page]);

    if (loading) return <Loading></Loading>;

    return (
        <div className="p-6 max-w-6xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">My Donation Requests</h1>

         
            <div className="flex gap-3 mb-6 flex-wrap">
                {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
                    <button
                        key={status}
                        className={`px-4 py-2 rounded ${statusFilter === status
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        onClick={() => { setStatusFilter(status); setPage(1); }}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

         
            <div className="overflow-x-auto border rounded">
                <table className="w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border">Recipient</th>
                            <th className="py-2 px-4 border">Blood Group</th>
                            <th className="py-2 px-4 border">Hospital</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Time</th>
                            <th className="py-2 px-4 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No donation requests found.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{req.recipientName}</td>
                                    <td className="py-2 px-4 border">{req.bloodGroup}</td>
                                    <td className="py-2 px-4 border">{req.hospital}</td>
                                    <td className="py-2 px-4 border">{req.donationDate}</td>
                                    <td className="py-2 px-4 border">{req.donationTime}</td>
                                    <td className="py-2 px-4 border">
                                        <span
                                            className={`px-2 py-1 rounded text-white font-medium ${req.status === "pending"
                                                ? "bg-yellow-500"
                                                : req.status === "inprogress"
                                                    ? "bg-blue-500"
                                                    : req.status === "done"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                        >
                                            {req.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

          
            <div className="flex justify-center gap-3 mt-4">
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>
                <span className="px-3 py-1 font-medium">
                    {page} / {totalPages}
                </span>
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyRequest;
