import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-red-900 text-white py-10 mt-0">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 px-4 text-center">

                <Link to="/">
                    <img
                        src="https://img.icons8.com/?size=160&id=sdQDcFMKaNcf&format=png" 
                        alt="RedHope Logo"
                        className="w-16 bg-white p-1 rounded-full object-cover transition-transform duration-500 hover:scale-110 mx-auto"
                    />
                </Link>

                <h2 className="text-xl font-bold">RedHope</h2>

                <p className="text-gray-200 max-w-md">
                    Donate blood, save lives! Join our community of generous donors and help those in need.
                    Every drop counts—your donation can give someone a second chance at life.
                </p>

                <p className="text-gray-300 font-semibold">
                    Contact: +880 1633-029529
                </p>

                <div className="flex gap-4 mt-4 justify-center">
                    <a href="#" aria-label="Facebook" className="hover:text-pink-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                    </a>

                    <a href="#" aria-label="Twitter" className="hover:text-pink-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                    </a>

                    <a href="#" aria-label="Instagram" className="hover:text-pink-500  transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608.975-.975 2.242-1.25 3.608-1.312C8.416 2.175 8.796 2.163 12 2.163z" />
                        </svg>
                    </a>

                    <a href="#" aria-label="LinkedIn" className="hover:text-pink-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.785v2.223h.067c.666-1.26 2.292-2.588 4.717-2.588C21.923 7.635 24 10.29 24 15.049V24h-5v-7.547c0-1.799-.032-4.114-2.507-4.114-2.507 0-2.892 1.957-2.892 3.988V24h-5V8z" />
                        </svg>
                    </a>
                </div>

                <p className="text-sm text-gray-300 mt-6">
                    © {new Date().getFullYear()} RedHope. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
