import axios from "axios";
import Cookies from 'universal-cookie';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true,
    timeout: 60000,
    headers: {
        Accept: "application/json"
    }
});

const csrfToken = await axiosClient.get('/sanctum/csrf-cookie', {
    baseURL: 'http://192.168.1.108:8000/',
    withCredentials: true,
})

axiosClient.interceptors.request.use((config) => {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
});


axiosClient.interceptors.response.use((response) => {

    return response;
},
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) {
            }
        } catch (e) {
            console.error(e)
        }

        throw error;
    }


)


export default axiosClient;