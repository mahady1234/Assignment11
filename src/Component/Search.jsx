import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Search = () => {
     const axiosSecure=useAxiosSecure()
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
            .catch(err => console.error("Failed to load districts:", err));

        axios.get("/upazila.json")
            .then(res => setUpazilas(res.data.upazilas))
            .catch(err => console.error("Failed to load upazilas:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "district") {
            const districtName = districts.find(d => d.id === value)?.name || "";
            setForm(prev => ({ ...prev, district: districtName, upazila: "" }));

            const filtered = upazilas.filter(u => u.district_id === value);
            setFilteredUpazilas(filtered);
        } else if (name === "upazila") {
            const upazilaName = upazilas.find(u => u.id === value)?.name || "";
            setForm(prev => ({ ...prev, upazila: upazilaName }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);

        try {
            const res = await axiosSecure.get("/public/search-donors", {
                params: {
                    bloodGroup: form.bloodGroup,
                    district: form.district,
                    upazila: form.upazila
                }
            });
            setDonors(res.data);
        } catch (err) {
            console.error("Search failed:", err);
            setDonors([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-20 p-4 md:p-6">
            <h1 className="text-3xl font-semibold mb-6">Search Blood Donors</h1>

            <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-lg shadow"
            >
                <select
                    name="bloodGroup"
                    required
                    value={form.bloodGroup}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
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
                    className="border rounded px-3 py-2"
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
                    className="border rounded px-3 py-2"
                    disabled={filteredUpazilas.length === 0}
                >
                    <option value="">Upazila</option>
                    {filteredUpazilas.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-red-600 text-white rounded px-4 py-2 font-medium"
                >
                    Search
                </button>
            </form>

            <div className="mt-8">
                {!searched && <p className="text-gray-500 text-center">Please search to find available donors.</p>}
                {loading && <p className="text-center mt-4">Loading...</p>}
                {searched && !loading && donors.length === 0 && <p className="text-center text-gray-500 mt-4">No donors found.</p>}
                {donors.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {donors.map(donor => (
                            <div key={donor._id} className="border rounded-lg p-4 shadow-sm bg-white">
                                <h3 className="font-semibold text-lg">{donor.name}</h3>
                                <p className="text-sm text-gray-600">Blood Group: {donor.bloodGroup}</p>
                                <p className="text-sm text-gray-600">Location: {donor.upazila}, {donor.district}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
