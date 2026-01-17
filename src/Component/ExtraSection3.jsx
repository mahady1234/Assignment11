import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Search = () => {
    const axiosSecure = useAxiosSecure();

    const [form, setForm] = useState({
        bloodGroup: "",
        district: "",
        upazila: "",
    });

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const [donors, setDonors] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("/district.json")
            .then(res => setDistricts(res.data.districts))
            .catch(err => console.error(err));

        axios.get("/upazila.json")
            .then(res => setUpazilas(res.data.upazilas))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "district") {
            const districtName = districts.find(d => d.id === value)?.name || "";
            setForm(prev => ({ ...prev, district: districtName, upazila: "" }));

            const filtered = upazilas.filter(u => u.district_id === value);
            setFilteredUpazilas(filtered);
        }
        else if (name === "upazila") {
            const upazilaName = upazilas.find(u => u.id === value)?.name || "";
            setForm(prev => ({ ...prev, upazila: upazilaName }));
        }
        else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);

        try {
            const res = await axiosSecure.get("/public/search-donors", {
                params: form
            });
            setDonors(res.data);
        } catch {
            setDonors([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-red-50 via-white to-red-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    Find Blood Donors
                </h1>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                    Search for available blood donors by blood group and location.
                </p>

                {/* Search Form */}
                <form
                    onSubmit={handleSearch}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-md"
                >
                    <select
                        name="bloodGroup"
                        required
                        value={form.bloodGroup}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 focus:outline-red-400"
                    >
                        <option value="">Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>

                    <select
                        name="district"
                        value={districts.find(d => d.name === form.district)?.id || ""}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 focus:outline-red-400"
                    >
                        <option value="">District</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>

                    <select
                        name="upazila"
                        value={upazilas.find(u => u.name === form.upazila)?.id || ""}
                        onChange={handleChange}
                        disabled={filteredUpazilas.length === 0}
                        className="border rounded-lg px-3 py-2 focus:outline-red-400 disabled:bg-gray-100"
                    >
                        <option value="">Upazila</option>
                        {filteredUpazilas.map(u => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                    >
                        Search
                    </button>
                </form>

                {/* Result Area */}
                <div className="mt-10">
                    {!searched && (
                        <p className="text-center text-gray-500">
                            Please search to find available donors.
                        </p>
                    )}

                    {loading && (
                        <p className="text-center mt-4 text-red-500 font-medium">
                            Loading donors...
                        </p>
                    )}

                    {searched && !loading && donors.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">
                            No donors found.
                        </p>
                    )}

                    {donors.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            {donors.map(donor => (
                                <div
                                    key={donor._id}
                                    className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                                >
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        {donor.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Blood Group: <span className="font-medium">{donor.bloodGroup}</span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Location: {donor.upazila}, {donor.district}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Search;
