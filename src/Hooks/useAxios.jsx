import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://blood-donation-server-kappa.vercel.app'
})


const useAxios = () => {
    return axiosInstance
};

export default useAxios;