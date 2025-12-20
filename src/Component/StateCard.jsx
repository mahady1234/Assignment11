const StatCard = ({ icon, title, value }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
            <div className="text-red-500 bg-red-50 p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;
