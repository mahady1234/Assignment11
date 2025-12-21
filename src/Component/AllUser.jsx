import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllUsers = () => {
     const axiosSecure=useAxiosSecure()
    const [users, setUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchUsers = async () => {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateStatus = async (email, status) => {
        await axiosSecure.patch(
            `/users/status?email=${email}&status=${status}`
        );
        fetchUsers();
    };

    const updateRole = async (email, role) => {
        await axiosSecure.patch(
            `/users/role?email=${email}&role=${role}`
        );
        fetchUsers();
    };

    const filteredUsers =
        statusFilter === "all"
            ? users
            : users.filter(user => user.status === statusFilter);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-xl shadow-md p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">
                        All Users 
                    </h2>

                    {/* Filter */}
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="all">All</option>
                        <option value="Active">Active</option>
                        <option value="block">Block</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id} className="hover">
                                    {/* Avatar + Name */}
                                    <td className="flex items-center gap-3">
                                        <img
                                            src={user.imageUrl}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span>{user.name}</span>
                                    </td>

                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role}</td>

                                    <td>
                                        <span
                                            className={`badge ${user.status === "Active"
                                                    ? "badge-success"
                                                    : "badge-error"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="text-center">
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-ghost btn-sm">
                                                <MoreVertical />
                                            </label>

                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44"
                                            >
                                                {/* Block / Unblock */}
                                                {user.status === "Active" ? (
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                updateStatus(user.email, "block")
                                                            }
                                                        >
                                                            Block User
                                                        </button>
                                                    </li>
                                                ) : (
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                updateStatus(user.email, "Active")
                                                            }
                                                        >
                                                            Unblock User
                                                        </button>
                                                    </li>
                                                )}

                                                {/* Make Volunteer */}
                                                {user.role === "donor" && (
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                updateRole(user.email, "volunteer")
                                                            }
                                                        >
                                                            Make Volunteer
                                                        </button>
                                                    </li>
                                                )}

                                                {/* Make Admin */}
                                                {user.role !== "Admin" && (
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                updateRole(user.email, "Admin")
                                                            }
                                                        >
                                                            Make Admin
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
