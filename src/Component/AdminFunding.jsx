


import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { useSearchParams } from 'react-router';

const AdminFunding = () => {
    const { user } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get('session_id');

    const [fundings, setFundings] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;
        const userEmail = user.email;
        const donorName = user?.displayName;

        const formData = { donateAmount, userEmail, donorName };

        axios.post('http://localhost:5000/create-payment-checkout', { formData })
            .then(res => {
                console.log(res.data);
                window.location.href = res.data.url;
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (session_id) {
            const fetchSuccess = async () => {
                try {
                    const res = await axios.post(`http://localhost:5000/success-payment?session_id=${session_id}`);
                    console.log(res.data);
                    fetchFundings();

                    window.history.replaceState(null, '', '/funding');
                } catch (err) {
                    console.error(err);
                }
            }
            fetchSuccess();
        }
    }, [session_id]);


    const fetchFundings = () => {
        setLoading(true);
        axios.get('http://localhost:5000/donations')
            .then(res => {
                setFundings(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchFundings();
    }, []);

    return (
        <div className='min-h-screen my-30 px-4 md:px-20'>
            <h3 className='text-black text-3xl font-bold text-center my-5'>Funding Details Page</h3>

            <form onSubmit={handleCheckout} className='flex justify-center items-center gap-2 mb-10'>
                <input
                    name='donateAmount'
                    type="number"
                    placeholder='Amount in USD'
                    className="input border-2 border-black"
                    required
                />
                <button className='btn btn-primary' type='submit'>Donate</button>
            </form>

            <div className='overflow-x-auto'>
                {loading ? (
                    <p className='text-center'>Loading funding history...</p>
                ) : (
                    <table className='table table-zebra w-full'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Donor Name</th>
                                <th>Email</th>
                                <th>Amount (USD)</th>
                                <th>Transaction Id</th>
                                <th>Payment Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fundings.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className='text-center'>No donations yet</td>
                                </tr>
                            ) : (
                                fundings.map((fund, index) => (
                                    <tr key={fund._id}>
                                        <td>{index + 1}</td>
                                        <td>{fund.donorName}</td>
                                        <td>{fund.donorEmail}</td>
                                        <td>{fund.amount}</td>
                                        <td>{fund.
                                            transactionId}</td>

                                        <td>{fund.payment_status}</td>
                                        <td>{new Date(fund.paidAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminFunding;




// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { AuthContext } from '../Auth/AuthProvider';

// const AdminFunding = () => {
//     const { user } = useContext(AuthContext); // Firebase user
//     const [role, setRole] = useState(null); // admin | volunteer | donor
//     const [fundings, setFundings] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [searchParams] = useSearchParams();
//     const session_id = searchParams.get('session_id');

//     /* ---------------- Fetch Role from Server ---------------- */
//     const fetchRole = async () => {
//         if (!user?.email) return;

//         try {
//             const res = await axios.get(`http://localhost:5000/users/role?email=${user.email}`);
//             setRole(res.data.role); // expects { role: 'admin' | 'donor' | 'volunteer' }
//         } catch (err) {
//             console.error("Failed to fetch role:", err);
//         }
//     };

//     /* ---------------- Fetch Fundings ---------------- */
//     const fetchFundings = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get('http://localhost:5000/donations');
//             setFundings(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* ---------------- Stripe Checkout (Donor) ---------------- */
//     const handleCheckout = async (e) => {
//         e.preventDefault();
//         const donateAmount = e.target.amount.value;

//         const payload = {
//             donateAmount,
//             userEmail: user.email,
//             donorName: user.displayName,
//         };

//         try {
//             const res = await axios.post('http://localhost:5000/create-payment-checkout', payload);
//             window.location.href = res.data.url;
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     /* ---------------- Handle Stripe Success ---------------- */
//     useEffect(() => {
//         if (session_id) {
//             axios.post(`http://localhost:5000/success-payment?session_id=${session_id}`)
//                 .then(() => {
//                     fetchFundings();
//                     window.history.replaceState(null, '', '/dashboard/funding');
//                 })
//                 .catch(console.error);
//         }
//     }, [session_id]);

//     /* ---------------- Initial Fetch ---------------- */
//     useEffect(() => {
//         fetchRole();
//     }, [user]);

//     /* ---------------- Fetch fundings if admin/volunteer ---------------- */
//     useEffect(() => {
//         if (role === 'Admin' || role === 'volunteer') {
//             fetchFundings();
//         } else {
//             setLoading(false);
//         }
//     }, [role]);

//     /* ---------------- Total Fund ---------------- */
//     const totalFund = fundings.reduce((sum, f) => sum + Number(f.amount || 0), 0);

//     return (
//         <div className="min-h-screen px-4 md:px-20 py-10">

//             {/* ================= Donor ================= */}
            

//             {/* ================= Admin & Volunteer ================= */}
//             {(role === 'Admin' || role === 'volunteer') && (
//                 <>
//                     <div className="mb-6 text-center">
//                         <h2 className="text-2xl flex gap-2 font-semibold">
//                             <img className='w-8' src="https://img.icons8.com/?size=160&id=6GVB3vBSYibr&format=png" alt="" srcset="" /> Total Fund: ${totalFund}
//                         </h2>
//                     </div>

//                     <div className="overflow-x-auto">
//                         {loading ? (
//                             <p className="text-center">Loading funding data...</p>
//                         ) : (
//                             <table className="table table-zebra w-full">
//                                 <thead>
//                                     <tr>
//                                         <th>#</th>
//                                         <th>Donor Name</th>
//                                         <th>Email</th>
//                                         <th>Amount</th>
//                                         <th>Status</th>
//                                         <th>Date</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {fundings.length === 0 ? (
//                                         <tr>
//                                             <td colSpan="6" className="text-center">No donations yet</td>
//                                         </tr>
//                                     ) : (
//                                         fundings.map((fund, index) => (
//                                             <tr key={fund._id}>
//                                                 <td>{index + 1}</td>
//                                                 <td>{fund.donorName}</td>
//                                                 <td>{fund.donorEmail}</td>
//                                                 <td>${fund.amount}</td>
//                                                 <td>{fund.payment_status}</td>
//                                                 <td>{new Date(fund.paidAt).toLocaleString()}</td>
//                                             </tr>
//                                         ))
//                                     )}
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default AdminFunding;
