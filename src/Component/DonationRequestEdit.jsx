import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const DonationRequestEdit = () => {
     const axiosSecure=useAxiosSecure()
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        recipientName: "",
        district: "",
        upazila: "",
        hospital: "",
        fullAddress: "",
        bloodGroup: "",
        donationDate: "",
        donationTime: "",
        message: "",
        status: ""
    });

    useEffect(() => {
        axiosSecure.get(`/donorRequest/${id}`)
            .then(res => setFormData(res.data))
            .catch(err => console.log(err));
    }, [axiosSecure, id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosSecure.patch(`/donorRequest/${id}`, formData)
            .then(() => {
                alert("Request updated successfully!");
                navigate("/dashBoard");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Donation Request</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow p-5 rounded-lg space-y-4">
                <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    placeholder="Recipient Name"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="District"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleChange}
                    placeholder="Upazila"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Hospital"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleChange}
                    placeholder="Full Address"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    placeholder="Blood Group"
                    className="input input-bordered w-full"
                />
                <input
                    type="date"
                    name="donationDate"
                    value={formData.donationDate}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <input
                    type="time"
                    name="donationTime"
                    value={formData.donationTime}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="textarea textarea-bordered w-full"
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                >
                    <option value="pending">Pending</option>
                    <option value="inprogress">Inprogress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
                <button type="submit" className="btn btn-success w-full">Update Request</button>
            </form>
        </div>
    );
};

export default DonationRequestEdit;
