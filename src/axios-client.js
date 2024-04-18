import axios from "axios";


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    timeout: 60000,
    withCredentials: true,
    headers: {
        Accept: "application/json"
    }
});

// const csrfToken = await axiosClient.get('/sanctum/csrf-cookie', {
//     baseURL: 'http://192.168.1.108:8000/',
// }).then((res) => {
// })

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    // config.headers['X-CSRF-TOKEN'] = csrfToken;
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
            
        }

        throw error;
    }


)


export default axiosClient;