
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CreateRequest = () => {
    const { user } = useContext(AuthContext);
     const axiosSecure=useAxiosSecure()

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const [selectedDistrictId, setSelectedDistrictId] = useState("");

    /* ---------------- Load JSON data ---------------- */
    useEffect(() => {
        axios.get("/district.json")
            .then(res => setDistricts(res.data.districts || []));

        axios.get("/upazila.json")
            .then(res => setUpazilas(res.data.upazilas || []));
    }, []);

    /* ---------------- District Change ---------------- */
    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrictId(districtId);

        const matchedUpazilas = upazilas.filter(
            u => u.district_id === districtId
        );
        setFilteredUpazilas(matchedUpazilas);
    };

    /* ---------------- Submit ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        // 🔥 ID → NAME mapping (core fix)
        const selectedDistrict = districts.find(
            d => d.id === selectedDistrictId
        );

        const selectedUpazila = upazilas.find(
            u => u.id === form.upazila.value
        );

        const requestData = {
            requesterName: user?.displayName || "",
            email: user?.email || "",
            recipientName: form.recipientName.value,

            // ✅ DB will store NAME, not ID
            district: selectedDistrict?.name || "",
            upazila: selectedUpazila?.name || "",

            hospital: form.hospital.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            message: form.message.value,
            status: "pending",
            createdAt: new Date()
        };

        try {
            await axiosSecure.post("/donorRequest", requestData);
            toast.success("Your Blood Donation Request Created Successfully");
            form.reset();
            setFilteredUpazilas([]);
            setSelectedDistrictId("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to create request");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4 py-8">
            <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
                    Blood Donation Request
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Requester Name */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Requester Name
                        </label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="input input-bordered w-full border-gray-400 bg-white"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered w-full border-gray-400 bg-white"
                        />
                    </div>

                    {/* Recipient */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Recipient Name
                        </label>
                        <input
                            type="text"
                            name="recipientName"
                            required
                            className="input input-bordered w-full border-gray-400 bg-white"
                        />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Blood Group
                        </label>
                        <select
                            name="bloodGroup"
                            required
                            className="select select-bordered w-full border-gray-400 bg-white"
                        >
                            <option value="">Select Blood Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
                                .map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                        </select>
                    </div>

                    {/* District & Upazila */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            District
                        </label>
                        <select
                            name="district"
                            required
                            onChange={handleDistrictChange}
                            className="select select-bordered w-full border-gray-400 bg-white"
                        >
                            <option value="">Select District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>

                        <label className="block mb-1 font-semibold text-gray-700 mt-2">
                            Upazila
                        </label>
                        <select
                            name="upazila"
                            required
                            disabled={filteredUpazilas.length === 0}
                            className="select select-bordered w-full border-gray-400 bg-white"
                        >
                            <option value="">Select Upazila</option>
                            {filteredUpazilas.map(u => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Hospital */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold text-gray-700">
                            Hospital Name
                        </label>
                        <input
                            type="text"
                            name="hospital"
                            required
                            className="input input-bordered w-full border-gray-400 bg-white"
                        />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold text-gray-700">
                            Full Address
                        </label>
                        <textarea
                            name="fullAddress"
                            rows="3"
                            required
                            className="textarea textarea-bordered w-full border-gray-400 bg-white"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Donation Date
                        </label>
                        <input
                            type="date"
                            name="donationDate"
                            required
                            className="input input-bordered w-full border-gray-400 bg-white"
                        />
                    </div>

                    {/* Time */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Donation Time
                        </label>
                        <input
                            type="time"
                            name="donationTime"
                            required
                            className="input input-bordered w-full border-gray-400 bg-white"
                        />
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold text-gray-700">
                            Request Message
                        </label>
                        <textarea
                            name="message"
                            rows="4"
                            required
                            placeholder="Explain the urgency..."
                            className="textarea textarea-bordered w-full border-gray-400 bg-white"
                        />
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="btn w-full bg-red-600 hover:bg-red-700 text-white text-lg"
                        >
                            Request Blood
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRequest;
