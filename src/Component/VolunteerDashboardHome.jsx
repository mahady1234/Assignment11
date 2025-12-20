// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Users, Droplet, DollarSign } from "lucide-react";
// import StatCard from "./StateCard";

// const AdminDashboardHome = () => {
//     const [stats, setStats] = useState({
//         totalDonors: 0,
//         totalFunding: 0,
//         totalRequests: 0,
//     });

//     useEffect(() => {
//         axios.get("http://localhost:5000/admin/stats")
//             .then(res => setStats(res.data));
//     }, []);

//     return (
//         <div className="p-6">
//             {/* Welcome Section */}
//             <div className="mb-8">
//                 <h2 className="text-2xl mt-5 font-semibold">
//                     Welcome back, Admin
//                 </h2>
//                 <p className="text-gray-500 mt-1">
//                     Here’s an overview of the platform activity
//                 </p>
//             </div>

//             {/* Statistics Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <StatCard
//                     icon={<Users size={28} />}
//                     title="Total Donors"
//                     value={stats.totalDonors}
//                 />
//                 <StatCard
//                     icon={<DollarSign size={28} />}
//                     title="Total Funding"
//                     value={`৳ ${stats.totalFunding}`}
//                 />
//                 <StatCard
//                     icon={<Droplet size={28} />}
//                     title="Total Requests"
//                     value={stats.totalRequests}
//                 />
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardHome;



import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Droplet, DollarSign } from "lucide-react";
import StatCard from "./StateCard";

const AdminDashboardHome = () => {
    const [stats, setStats] = useState({
        totalDonors: 0,
        totalFunding: 0,
        totalRequests: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/admin/stats")
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading dashboard...</p>;
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl mt-5 font-semibold">
                    Welcome back, Admin
                </h2>
                <p className="text-gray-500 mt-1">
                    Here’s an overview of the platform activity
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={<Users size={28} />}
                    title="Total Donors"
                    value={stats.totalDonors}
                />
                <StatCard
                    icon={<DollarSign size={28} />}
                    title="Total Funding"
                    value={`৳ ${stats.totalFunding}`}
                />
                <StatCard
                    icon={<Droplet size={28} />}
                    title="Total Requests"
                    value={stats.totalRequests}
                />
            </div>
        </div>
    );
};

export default AdminDashboardHome;
