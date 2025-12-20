import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    Home,
    User,
    Droplet,
    Users,
    LogOut,
    Menu,
    HomeIcon
} from "lucide-react";
import { AuthContext } from "../Auth/AuthProvider";

export default function Aside() {
    const [open, setOpen] = useState(false);
    const { logOut, role } = useContext(AuthContext);
    const location = useLocation();

    const handleLogOut = () => {
        logOut();
        setOpen(false);
    };

    /* 🔹 1️⃣ Route change হলে sidebar auto close (mobile) */
    useEffect(() => {
        setOpen(false);
    }, [location.pathname

    ]);

    /* 🔹 2️⃣ ESC key press করলে sidebar close */
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-md text-sm transition
        ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"}`;

    return (
        <div className="flex min-h-screen relative">

            {/* 🔹 3️⃣ Overlay (outside click → close) */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`bg-gray-900 text-white fixed md:static z-40
                h-full w-64 transform transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0`}
            >

                {/* HEADER */}
                <div className="h-16 flex items-center justify-end px-4 border-b border-gray-700">
                    <button
                        onClick={() => setOpen(!open)}
                        className="hidden md:block"
                    >
                        <Menu />
                    </button>
                </div>

                {/* MENU */}
                <nav className="px-3 py-4 space-y-2">

                    <NavLink to="/dashBoard" className={linkClass}>
                        <Home size={18} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/dashBoard/profile" className={linkClass}>
                        <User size={18} />
                        <span>Profile</span>
                    </NavLink>

                    {role === "donor" && (
                        <>
                            <NavLink to="/dashBoard/createRequest" className={linkClass}>
                                <Droplet size={18} />
                                <span>Create Request</span>
                            </NavLink>

                            <NavLink to="/dashBoard/my-donation-requests" className={linkClass}>
                                <Droplet size={18} />
                                <span>My Requests</span>
                            </NavLink>
                            
                        </>
                    )}

                    {role === "Admin" && (
                        <>
                            <NavLink to="/dashBoard/allUser" className={linkClass}>
                                <Users size={18} />
                                <span>All Users</span>
                            </NavLink>

                            <NavLink to="admin-donation-requests" className={linkClass}>
                                <Droplet size={18} />
                                <span>All Donation Requests</span>
                            </NavLink>
                            <NavLink to="/dashBoard/adminFunding" className={linkClass}>
                                <Droplet size={18} />
                                <span>Funding</span>
                            </NavLink>

                        </>
                    )}

                    {role === "volunteer" && (<>


                        <NavLink to="/dashBoard/createRequest" className={linkClass}>
                            <Droplet size={18} />
                            <span>Create Request</span>
                        </NavLink>
                        <NavLink to="volunteer-donation-requests" className={linkClass}>
                            <Droplet size={18} />
                            <span>All Donation Requests</span>
                        </NavLink>
                        <NavLink to="/dashBoard/adminFunding" className={linkClass}>
                            <Droplet size={18} />
                            <span>Funding</span>
                        </NavLink>
                    </>
                    )}

                    <Link to={'/'}

                        className="flex items-center gap-3 p-3 rounded-md text-sm
                        text-red-400 hover:bg-gray-700 w-full mt-6"
                    >
                        <HomeIcon size={18} />
                        <span>Home</span>
                    </Link>
                    <button
                        onClick={handleLogOut}
                        className="flex items-center gap-3 p-3 rounded-md text-sm
                        text-red-400 hover:bg-gray-700 w-full mt-6"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>

                </nav>
            </aside>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setOpen(true)}
                    className="p-2 bg-gray-900 text-white rounded"
                >
                    <Menu />
                </button>
            </div>

        </div>
    );
}
