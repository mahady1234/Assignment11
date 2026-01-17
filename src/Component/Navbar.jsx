import React, { useContext } from 'react';
import MyContainer from './MyContainer';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);



    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Logged out successfully"))
            .catch((error) => toast.error(error.message));
    };

    return (
        <div className='bg-red-900 shadow-xl text-white py-3 fixed top-0 left-0 w-full z-50'>
            <MyContainer>
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <div className="lg:hidden dropdown">
                            <label tabIndex={0} className="btn btn-ghost p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-black font-bold"
                            >
                                <li><NavLink to='/'>Home</NavLink></li>
                                <li><NavLink to='/allDonationRequest'>Donation Request</NavLink></li>
                                <li><NavLink to='/search'>Search Donor</NavLink></li>
                                <li><NavLink to='/about'>About</NavLink></li>
                                <li><NavLink to='/faq'>FAQ</NavLink></li>
                                <li><NavLink to='/blog'>Blog</NavLink></li>


                                {user && <li><NavLink to='/funding'>Funding</NavLink></li>}

                            </ul>
                        </div>

                        <Link to='/' className='flex items-center gap-1'>
                            <img
                                className='w-10 h-10 bg-white p-1 rounded-full object-cover transition-transform duration-500 hover:scale-110'
                                src="https://img.icons8.com/?size=160&id=sdQDcFMKaNcf&format=png"
                                alt="logo"
                            />
                            <h3 className='text-sm md:text-2xl font-bold'>RedHope</h3>
                        </Link>
                    </div>

                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal gap-2 font-bold text-[16px]">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/allDonationRequest'>Donation Request</NavLink></li>
                            <li><NavLink to='/search'>Search Donor</NavLink></li>
                            <li><NavLink to='/about'>About</NavLink></li>
                            <li><NavLink to='/faq'>FAQ</NavLink></li>
                            <li><NavLink to='/blog'>Blog</NavLink></li>


                            {user && <li><NavLink to='/funding'>Funding</NavLink></li>}

                        </ul>
                    </div>

                    <div className="flex items-center gap-3">

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL || "https://img.icons8.com/?size=128&id=Ib9FADThtmSf&format=png"} alt="profile" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content mt-3 p-2 shadow bg-white rounded-box w-40 text-black font-bold"
                                >
                                    <li><Link to='/dashBoard' className='px-3 py-2 block hover:bg-gray-200 rounded '>Dashboard</Link></li>

                                    <li><button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded">Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to='/authRoot/login' className="btn bg-blue-100 text-black">Login / Register</Link>
                        )}

                    </div>

                </div>
            </MyContainer>
        </div>
    );
};

export default Navbar;
