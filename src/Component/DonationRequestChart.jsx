import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const DonationRequestChart = ({ data, title, dataKey }) => {
    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4">{title}</h3>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={dataKey} />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="count"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonationRequestChart;
