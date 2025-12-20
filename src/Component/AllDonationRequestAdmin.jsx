import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const AllBloodDonationRequestAdmin = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 5;

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                "http://localhost:5000/admin/blood-donation-requests",
                {
                    params: { status: statusFilter, page, limit },
                }
            );

            setRequests(res.data.requests);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [statusFilter, page]);

    const updateStatus = async (id, status) => {
        await axios.patch(
            "http://localhost:5000/admin/donation-request/status",
            { id, status }
        );
        fetchRequests();
    };

    if (loading) return <Loading />;

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
                All Blood Donation Requests 
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                {["all", "pending", "inprogress", "done", "canceled"].map(status => (
                    <button
                        key={status}
                        onClick={() => {
                            setStatusFilter(status);
                            setPage(1);
                        }}
                        className={`px-4 py-2 rounded text-sm font-medium
                            ${statusFilter === status
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Requester</th>
                            <th className="p-3 text-left">Recipient</th>
                            <th className="p-3">Blood</th>
                            <th className="p-3">Hospital</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">
                                    No donation requests found.
                                </td>
                            </tr>
                        ) : (
                            requests.map(req => (
                                <tr key={req._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{req.requesterName}</td>
                                    <td className="p-3">{req.recipientName}</td>
                                    <td className="p-3 text-center">{req.bloodGroup}</td>
                                    <td className="p-3">{req.hospital}</td>
                                    <td className="p-3">{req.donationDate}</td>
                                    <td className="p-3">{req.donationTime}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold text-white
                                                ${req.status === "pending"
                                                    ? "bg-yellow-500"
                                                    : req.status === "inprogress"
                                                        ? "bg-blue-500"
                                                        : req.status === "done"
                                                            ? "bg-green-600"
                                                            : "bg-red-500"
                                                }`}
                                        >
                                            {req.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {req.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(req._id, "inprogress")
                                                        }
                                                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                                                    >
                                                        Start
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(req._id, "canceled")
                                                        }
                                                        className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                            {req.status === "inprogress" && (
                                                <button
                                                    onClick={() =>
                                                        updateStatus(req._id, "done")
                                                    }
                                                    className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                                                >
                                                    Mark Done
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="font-medium">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllBloodDonationRequestAdmin;
