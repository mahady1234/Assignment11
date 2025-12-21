// Register.jsx
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
     

    const axiosSecure = useAxiosSecure()

    const { createUser, updateUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // JSON থেকে load করা হচ্ছে
    useEffect(() => {
        axios.get("/district.json").then(res => setDistricts(res.data.districts));
        axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas));
    }, []);

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setFilteredUpazilas(upazilas.filter(u => u.district_id === districtId));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const imageFile = form.photo.files[0];
        const bloodGroup = form.bloodGroup.value;
        const districtId = form.district.value;
        const upazilaId = form.upazila.value;

        if (password.length < 6) return setError("Password must be at least 6 characters.");
        if (!/[A-Z]/.test(password)) return setError("Password must contain an uppercase letter.");
        if (!/[a-z]/.test(password)) return setError("Password must contain a lowercase letter.");
        if (!/[0-9]/.test(password)) return setError("Password must contain a number.");
        if (password !== confirmPassword) return setError("Passwords do not match.");

        try {
            // Firebase user create
            const result = await createUser(email, password);
            const loggedUser = result.user;

            // Image upload
            const formData = new FormData();
            formData.append("image", imageFile);
            const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=e793f21788fc31a56683162de3c21a1e`, formData);
            const imageUrl = imgRes.data.data.url;

            await updateUser({ displayName: name, photoURL: imageUrl });

            // JSON থেকে district এবং upazila name mapping
            const districtName = districts.find(d => d.id === districtId)?.name || "";
            const upazilaName = upazilas.find(u => u.id === upazilaId)?.name || "";

            const userInfo = {
                name,
                email,
                password,
                imageUrl,
                bloodGroup,
                district: districtName, // এখানে name পাঠানো হচ্ছে
                upazila: upazilaName,   // এখানে name পাঠানো হচ্ছে
                role: "donor",
                status: "Active"
            };

            // Save to server
            await axiosSecure.post("/users", userInfo);

            setUser({ ...loggedUser, displayName: name, photoURL: imageUrl });
            toast.success("Registration successful!");
            navigate("/");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") toast.error("Email already registered. Please login.");
            else toast.error("Something went wrong. Try again.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center my-25">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl p-4">
                <h2 className="text-2xl font-semibold text-center">Register</h2>
                <form onSubmit={handleRegister} className="space-y-3 mt-4">
                    <input name="name" required placeholder="Name" className="input w-full" />
                    <input name="photo" type="file" required className="file-input w-full" />

                    <select name="bloodGroup" required className="select w-full">
                        <option value="">Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>

                    <select name="district" required className="select w-full" onChange={handleDistrictChange}>
                        <option value="">Select District</option>
                        {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>

                    <select name="upazila" required className="select w-full" disabled={filteredUpazilas.length === 0}>
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>

                    <input name="email" type="email" required placeholder="Email" className="input w-full" />

                    <div className="relative">
                        <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="input w-full" />
                        <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    <div className="relative">
                        <input name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Confirm Password" className="input w-full" />
                        <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button className="btn btn-neutral w-full">Register</button>
                </form>

                <p className="text-center mt-3">
                    Already have an account? <Link to="/authRoot/login" className="text-red-500 ml-1">Login</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
