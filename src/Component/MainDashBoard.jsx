import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";

const MainDashBoard = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`http://localhost:5000/donorRequest?email=${user.email}&limit=3`)
                .then(res => setRequests(res.data))
                .catch(err => console.log(err));
        }
    }, [user]);

    // 🔹 Update Status (ONLY inprogress → done / canceled)
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/donorRequest/${id}`, {
                status: newStatus
            });

            setRequests(prev =>
                prev.map(item =>
                    item._id === id ? { ...item, status: newStatus } : item
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    // 🔹 Delete Request
    const handleDelete = async (id) => {
        const isConfirm = window.confirm(
            "Are you sure you want to delete this donation request?"
        );
        if (!isConfirm) return;

        try {
            await axios.delete(`http://localhost:5000/donorRequest/${id}`);
            setRequests(prev => prev.filter(item => item._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">

            {/* 🔹 Welcome */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                    Welcome,
                    <span className="text-red-600">
                        {user?.displayName || "Donor"}
                    </span>

                </h2>
                <p className="text-gray-600">
                    Here is an overview of your recent donation requests
                </p>
            </div>

            {/* 🔹 Recent Requests (only if exists) */}
            {requests.length > 0 ? (
                <div className="bg-white shadow rounded-lg p-5">

                    <h3 className="text-xl font-semibold mb-4">
                        Recent Donation Requests
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th>Recipient</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Blood</th>
                                    <th>Status</th>
                                    <th>Donor Info</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.map(req => (
                                    <tr key={req._id}>
                                        <td>{req.recipientName}</td>
                                        <td>{req.district}, {req.upazila}</td>
                                        <td>{req.donationDate}</td>
                                        <td>{req.donationTime}</td>
                                        <td>{req.bloodGroup}</td>

                                        <td className="capitalize font-medium">
                                            {req.status}
                                        </td>

                                        {/* Donor Info */}
                                        <td>
                                            {req.status === "inprogress" ? (
                                                <div className="text-sm">
                                                    <p>{user.displayName}</p>
                                                    <p className="text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="space-x-1">

                                            {req.status === "inprogress" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusUpdate(req._id, "done")
                                                        }
                                                        className="btn btn-xs btn-success"
                                                    >
                                                        Done
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleStatusUpdate(req._id, "canceled")
                                                        }
                                                        className="btn btn-xs btn-error"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                            <Link
                                                to={`/dashBoard/donation-request/${req._id}`}
                                                className="btn btn-xs btn-info"
                                            >
                                                View
                                            </Link>

                                            <Link
                                                to={`/dashBoard/edit-donation-request/${req._id}`}
                                                className="btn btn-xs btn-warning"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(req._id)}
                                                className="btn btn-xs btn-outline btn-error"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 🔹 View All */}
                    <div className="mt-5 text-right">
                        <Link
                            to="/dashBoard/my-donation-requests"
                            className="btn btn-sm btn-neutral"
                        >
                            View My All Requests
                        </Link>
                    </div>
                </div>
            ) : (<div className="bg-white shadow rounded-lg p-5">

                <h3 className="text-xl font-semibold mb-4">
                    Recent Donation Requests
                </h3>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Recipient</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Blood</th>
                                <th>Status</th>
                                <th>Donor Info</th>
                                <th>Actions</th>
                            </tr>
                        </thead>


                    </table>
                    <h3 className="text-center text-red-400 font-bold py-2">You have no dontion request at now</h3>
                </div>

                {/* 🔹 View All */}
                <div className="mt-5 text-right">
                    <Link to='/dashBoard/my-donation-requests' className="btn btn-sm btn-neutral">
                        View My All Requests
                    </Link>


                </div>
            </div>)}
        </div>
    );
};

export default MainDashBoard;
