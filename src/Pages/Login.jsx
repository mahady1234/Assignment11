import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import { AuthContext } from '../Auth/AuthProvider';

const Login = () => {
    const emailRef = useRef(null);
    const { signInUser, auth } = use(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter.");
            return;
        }

        signInUser(email, password)
            .then(() => {
                toast.success('Login Successful');
                navigate(`${location?.state ? location.state : '/'}`);
            })
            .catch(error => {
                setError(error.message);
                toast.error(error.message);
            });
    };



    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
            .then(() => toast.success("Reset Your Email"))
            .catch(e => toast.error(e.message));
    };

    return (
        <div className='min-h-screen flex justify-center items-center mx-auto mt-20'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-3">
                <h3 className='font-semibold text-2xl text-center'>Login your account</h3>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input
                                ref={emailRef}
                                required
                                name='email'
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Email"
                            />

                            <label className="label">Password</label>
                            <div className="relative w-full">
                                <input
                                    required
                                    name='password'
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full pr-10"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                </button>
                            </div>


                            {error && <p className='text-red-600 text-sm mt-1'>{error}</p>}

                            <div>
                                <button
                                    onClick={handleForgetPassword}
                                    type='button'
                                    className="link link-hover mt-2"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button type='submit' className="btn btn-neutral mt-4 w-full">Login</button>
                        </fieldset>
                    </form>




                </div>
                <div className='grid grid-cols-3 items-center w-3/12 mx-auto my-1'>
                    <p className='border-2 border-gray-500'></p>
                    <h3 className='text-[16px] text-black text-center'>Or</h3>
                    <p className='border-2 border-gray-500'></p>
                </div>
                <h3 className='text-center mt-3'>
                    Don’t Have An Account?{' '}
                    <Link className='text-red-500 font-semibold' to='/authRoot/register'>
                        Register
                    </Link>
                </h3>
            </div>
        </div>
    );
};

export default Login;
