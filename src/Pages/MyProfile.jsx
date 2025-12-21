import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";
import MyContainer from "../Component/MyContainer";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Profile = () => {
    const { user, updateUser, logOut } = useContext(AuthContext);
 const axiosSecure=useAxiosSecure()
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const [imageFile, setImageFile] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        district: "",
        upazila: "",
        bloodGroup: "",
    });


    /* ---------------- Load District & Upazila ---------------- */
    useEffect(() => {
        axios.get("/district.json")
            .then(res => setDistricts(res.data.districts));

        axios.get("/upazila.json")
            .then(res => setUpazilas(res.data.upazilas));
    }, []);

    /* ---------------- Load User Data ---------------- */
    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/users/email/${user.email}`)
            .then(res => {
                setFormData({
                    name: res.data.name || user.displayName || "",
                    imageUrl: res.data.imageUrl || user.photoURL || "",
                    district: res.data.district || "",
                    upazila: res.data.upazila || "",
                    bloodGroup: res.data.bloodGroup || "",
                });
                setLoading(false);
            });
    }, [axiosSecure, user]);


    /* ---------------- Handle Change ---------------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /* ---------------- Image Upload ---------------- */
    const handleImageUpload = async () => {
        if (!imageFile) return formData.imageUrl;

        const imgData = new FormData();
        imgData.append("image", imageFile);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=e793f21788fc31a56683162de3c21a1e`,
            imgData
        );

        return res.data.data.url;
    };


    /* ---------------- Save Profile ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageUrl = await handleImageUpload();

            await updateUser({
                displayName: formData.name,
                photoURL: imageUrl
            });

            await axiosSecure.patch(
                `/users/email/${user.email}`,
                {
                    name: formData.name,
                    imageUrl,
                    district: formData.district,
                    upazila: formData.upazila,
                    bloodGroup: formData.bloodGroup
                }
            );

            setFormData(prev => ({ ...prev, imageUrl }));
            toast.success("Profile updated successfully");
            setEditMode(false);

        } catch (err) {
            console.log(err);

            toast.error("Profile update failed");
        }
    };


    if (!user || loading) return null;

    return (
        <MyContainer>
            <div className="max-w-2xl mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">

                {/* Header */}
                <div className="flex flex-col items-center gap-3 mb-6">
                    <img
                        src={formData.imageUrl || "https://img.icons8.com/fluency/96/user-male-circle.png"}
                        className="w-24 h-24 rounded-full border-4 border-blue-400 object-cover"
                        alt="avatar"
                    />

                    <h2 className="text-2xl text-black font-bold">{formData.name}</h2>

                    <p className="text-black">{user.email}</p>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="btn btn-sm btn-outline btn-primary"
                    >
                        {editMode ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="input input-bordered w-full"
                        placeholder="Full Name"
                    />


                    <input
                        value={user.email}
                        disabled
                        className="input input-bordered w-full bg-gray-100"
                    />

                    {/* District */}
                    <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="select select-bordered w-full"
                    >
                        <option value="">District</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>

                    {/* Upazila */}
                    <select
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="select select-bordered w-full"
                    >
                        <option value="">Upazila</option>
                        {upazilas
                            .map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                    </select>

                    {/* Blood Group */}
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="select select-bordered w-full"
                    >
                        <option value="">Blood Group</option>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg =>
                            <option key={bg}>{bg}</option>
                        )}
                    </select>

                    {/* Image Upload */}
                    {editMode && (
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="file-input file-input-bordered w-full"
                        />
                    )}

                    {editMode && (
                        <button className="btn btn-primary md:col-span-2">
                            Save Changes
                        </button>
                    )}
                </form>

                <button
                    onClick={logOut}
                    className="btn btn-outline btn-error w-full mt-6"
                >
                    Logout
                </button>

            </div>
        </MyContainer>
    );
};

export default Profile;
