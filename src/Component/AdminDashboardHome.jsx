import DonationRequestChart from "./DonationRequestChart";
import axios from "axios";
import { Users, Droplet, DollarSign } from "lucide-react";
import StatCard from "./StateCard";
import { useEffect, useState } from "react";




const AdminDashboardHome = () => {
    const [stats, setStats] = useState({
        totalDonors: 0,
        totalFunding: 0,
        totalRequests: 0,
    });

    const [chartData, setChartData] = useState({
        daily: [],
        weekly: [],
        monthly: []
    });

    useEffect(() => {
        axios.get("http://localhost:5000/admin/donation-request-stats")
            .then(res => {
                setChartData({
                    daily: res.data.daily.map(d => ({
                        name: `${d._id.day}/${d._id.month}`,
                        count: d.count
                    })),
                    weekly: res.data.weekly.map(w => ({
                        name: `Week ${w._id.week}`,
                        count: w.count
                    })),
                    monthly: res.data.monthly.map(m => ({
                        name: `Month ${m._id.month}`,
                        count: m.count
                    }))
                });
            });
    }, []);
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
        <div className="p-6 mb-40">
            <div className=" mb-10">
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
            <div>
                <div className="space-y-10">

                    <DonationRequestChart
                        title="Daily Donation Requests"
                        data={chartData.daily}
                        dataKey="name"
                    />

                    <DonationRequestChart
                        title="Weekly Donation Requests"
                        data={chartData.weekly}
                        dataKey="name"
                    />

                    <DonationRequestChart
                        title="Monthly Donation Requests"
                        data={chartData.monthly}
                        dataKey="name"
                    />

                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
