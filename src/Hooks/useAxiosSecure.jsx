// import React, {   useContext, useEffect } from 'react';


// import axios from "axios";
// import { AuthContext } from '../Auth/AuthProvider';

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:5000'

// })

// const useAxiosSecure = () => {
//     const { user } = useContext(AuthContext)
//     useEffect(() => {
//         const reqInterceptor = axiosSecure.interceptors.request.use(config => {
//             config.headers.Authorization = `Bearer ${user?.accessToken}`
//             return config
//         })

//         const resInterceptor = axiosSecure.interceptors.response.use((response) => {
//             return response
//         }, (error) => {
//             console.log(error)
//             return Promise.reject(error)
//         })
//         return () => {
//             axiosSecure.interceptors.request.eject(reqInterceptor)
//             axiosSecure.interceptors.response.eject(resInterceptor)
//         }
//     }, [user])
//     return axiosSecure
// };

// export default useAxiosSecure;


// useAxiosSecure.jsx
import { useEffect } from "react";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosSecure = (user) => {

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });

        const resInterceptor = axiosSecure.interceptors.response.use(
            response => response,
            error => Promise.reject(error)
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;
