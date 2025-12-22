


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const DonationRequestEdit = () => {
    const axiosSecure = useAxiosSecure();
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
        status: "pending",
    });

    useEffect(() => {
        axiosSecure
            .get(`/donorRequest/${id}`)
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => console.error(err));
    }, [axiosSecure, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosSecure.patch(
                `/donorRequest/${id}`,
                formData
            );

            if (res.data && res.data._id) {
                alert("Request updated successfully!");
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);
            alert("Update failed!");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                Edit Donation Request
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow p-5 rounded-lg space-y-4"
            >
                <input name="recipientName" value={formData.recipientName} onChange={handleChange} className="input input-bordered w-full" />
                <input name="district" value={formData.district} onChange={handleChange} className="input input-bordered w-full" />
                <input name="upazila" value={formData.upazila} onChange={handleChange} className="input input-bordered w-full" />
                <input name="hospital" value={formData.hospital} onChange={handleChange} className="input input-bordered w-full" />
                <input name="fullAddress" value={formData.fullAddress} onChange={handleChange} className="input input-bordered w-full" />
                <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input input-bordered w-full" />
                <input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange} className="input input-bordered w-full" />
                <input type="time" name="donationTime" value={formData.donationTime} onChange={handleChange} className="input input-bordered w-full" />

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>

                <button className="btn btn-success w-full">
                    Update Request
                </button>
            </form>
        </div>
    );
};

export default DonationRequestEdit;
