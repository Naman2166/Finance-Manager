import axios from 'axios';
import { BASE_URL } from './apiPath';
import { API_PATH } from './apiPath';




// Create axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});


// Logout function
const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};


// Request interceptor: Add token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response interceptor: Handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401 && error.config.url !== API_PATH.AUTH.LOGIN) {                                            //401 => unauthorized
                logout();                                                    //defined above
            } else if (status === 500) {                                     //500 => server error
                console.error('Server error. Please try again later.');
            }
        } else if (error.code === 'ECONNABORTED') {                          //ECONNABORTED => request timed out
            console.error('Request timed out. Please try again later.');
        } else {
            console.error('An unexpected error occurred:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
