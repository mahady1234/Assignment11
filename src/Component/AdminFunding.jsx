


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AdminFunding = () => {
    const { user } = useContext(AuthContext);
     const axiosSecure=useAxiosSecure()
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

        axiosSecure.post('/create-payment-checkout', { formData })
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
                    const res = await axiosSecure.post(`/success-payment?session_id=${session_id}`);
                    console.log(res.data);
                    fetchFundings();

                    window.history.replaceState(null, '', '/funding');
                } catch (err) {
                    console.error(err);
                }
            }
            fetchSuccess();
        }
    }, [axiosSecure,  session_id]);


    const fetchFundings = () => {
        setLoading(true);
        axiosSecure.get('/donations')
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




