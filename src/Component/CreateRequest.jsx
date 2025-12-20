import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import toast from "react-hot-toast";

const CreateRequest = () => {
    const { user } = useContext(AuthContext);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    useEffect(() => {
        axios.get('/district.json').then(res => setDistricts(res.data.districts));
        axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
    }, []);

    const handleDistrictChange = (e) => setFilteredUpazilas(upazilas.filter(u => u.district_id === e.target.value));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const requestData = {
            requesterName: user?.displayName || "",
            email: user?.email || "",
            recipientName: form.recipientName.value,
            district: form.district.value,
            upazila: form.upazila.value,
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
            await axios.post('http://localhost:5000/donorRequest', requestData);
            toast.success('Your Blood Donation Request Created Successfully');
            form.reset();
        } catch (err) {
            console.error(err);
            toast.error('Failed to create request');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4 py-8">
            <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Blood Donation Request</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Requester Name</label>
                        <input type="text" name="requesterName" value={user?.displayName || ""} readOnly className="input input-bordered w-full border-gray-400 bg-white" />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Email</label>
                        <input type="email" name="email" value={user?.email || ""} readOnly className="input input-bordered w-full border-gray-400 bg-white" />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Recipient Name</label>
                        <input type="text" name="recipientName" className="input input-bordered w-full border-gray-400 bg-white" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Blood Group</label>
                        <select name="bloodGroup" required className="select select-bordered w-full border-gray-400 bg-white">
                            <option value="">Select Blood Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">District</label>
                        <select name="district" required className="select select-bordered w-full border-gray-400 bg-white" onChange={handleDistrictChange}>
                            <option value="">Select District</option>
                            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>

                        <label className="block mb-1 font-semibold text-gray-700 mt-2">Upazila</label>
                        <select name="upazila" required className="select select-bordered w-full border-gray-400 bg-white" disabled={filteredUpazilas.length === 0}>
                            <option value="">Select Upazila</option>
                            {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold text-gray-700">Hospital Name</label>
                        <input type="text" name="hospital" className="input input-bordered w-full border-gray-400 bg-white" required />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold text-gray-700">Full Address</label>
                        <textarea name="fullAddress" rows="3" className="textarea textarea-bordered w-full border-gray-400 bg-white" required></textarea>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Donation Date</label>
                        <input type="date" name="donationDate" className="input input-bordered w-full border-gray-400 bg-white" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Donation Time</label>
                        <input type="time" name="donationTime" className="input input-bordered w-full border-gray-400 bg-white" required />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold text-gray-700">Request Message</label>
                        <textarea name="message" rows="4" className="textarea textarea-bordered w-full border-gray-400 bg-white" placeholder="Explain the urgency..." required></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <button type="submit" className="btn w-full bg-red-600 hover:bg-red-700 text-white text-lg">
                            Request Blood
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRequest;
