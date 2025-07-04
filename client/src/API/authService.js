// import axios from 'axios';

// const API_BASE_URL = '';
// let csrfToken = null;

// const fetchCsrfToken = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/csrf-token`);
//         csrfToken = response.data._csrf;
//         console.log('Fetched CSRF Token:', csrfToken);
//         return csrfToken;
//     } catch (error) {
//         console.error('Error fetching CSRF token:', error);
//         throw new Error('Failed to get security token from server. Please try again.');
//     }
// };

// const getCsrfToken = async () => {
//     if (!csrfToken) {
//         await fetchCsrfToken();
//     }
//     return csrfToken;
// };

// const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(async (config) => {
//     if (config.method !== 'get') {
//         const token = await getCsrfToken();
//         if (token) {
//             config.headers['x-csrf-token'] = token;
//         } else {
//             console.warn('CSRF token is missing for a non-GET request.');
//         }
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// const authService = {
//     register: async (loggername, email, loggerpwd, confirmPassword) => {
//         try {
//             const response = await axiosInstance.post(`${API_BASE_URL}/auth/register`, {
//                 loggername,
//                 email,
//                 loggerpwd,
//                 confirmPassword,
//             });
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.err_message) {
//                 throw new Error(error.response.data.err_message);
//             }
//             throw new Error('Registration failed. Please try again later.');
//         }
//     },

//     login: async (email, loggerpwd) => { 
//         try {
//             const response = await axiosInstance.post(`${API_BASE_URL}/auth/login`, {
//                 email, 
//                 loggerpwd,
//             });
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.err_message) {
//                 throw new Error(error.response.data.err_message);
//             }
//             throw new Error('Login failed. Invalid email or password.'); // Updated message
//         }
//     },

//     logout: async () => {
//         try {
//             const response = await axiosInstance.post(`${API_BASE_URL}/auth/logout`);
//             csrfToken = null;
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.err_message) {
//                 throw new Error(error.response.data.err_message);
//             }
//             throw new Error('Logout failed.');
//         }
//     },

//     getProtectedResource: async () => {
//         try {
//             const response = await axiosInstance.get(`${API_BASE_URL}/protected-resource`);
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.err_message) {
//                 throw new Error(error.response.data.err_message);
//             }
//             if (error.response && error.response.status === 401) {
//                 throw new Error('Session expired or not logged in. Please log in again.');
//             }
//             throw new Error('Failed to fetch protected data.');
//         }
//     }
// };

// export default authService;

import axios from 'axios';

const API_BASE_URL = '';
let csrfToken = null;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
    if (config.method !== 'get') {
        const token = await authService.getCsrfToken();
        if (token) {
            config.headers['x-csrf-token'] = token; 
        } else {
            console.warn('CSRF token is missing for a non-GET request.');
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const authService = {
    fetchCsrfToken: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/csrf-token`);
            csrfToken = response.data._csrf;
            console.log('Fetched CSRF Token:', csrfToken);
            return csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            throw new Error('Failed to get security token from server. Please try again.');
        }
    },

    getCsrfToken: async () => {
        if (!csrfToken) {
            await authService.fetchCsrfToken(); 
        }
        return csrfToken;
    },

    register: async (loggername, email, loggerpwd, confirmPassword) => {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/auth/register`, {
                loggername,
                email,
                loggerpwd,
                confirmPassword,
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.err_message) {
                throw new Error(error.response.data.err_message);
            }
            throw new Error('Registration failed. Please try again later.');
        }
    },

    // User login
    login: async (email, loggerpwd) => {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/auth/login`, {
                email,
                loggerpwd,
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.err_message) {
                throw new Error(error.response.data.err_message);
            }
            throw new Error('Login failed. Invalid email or password.');
        }
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/auth/logout`);
            csrfToken = null; 
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.err_message) {
                throw new Error(error.response.data.err_message);
            }
            throw new Error('Logout failed.');
        }
    },

    getProtectedResource: async () => {
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}/protected-resource`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.err_message) {
                throw new Error(error.response.data.err_message);
            }
            if (error.response && error.response.status === 401) {
                throw new Error('Session expired or not logged in. Please log in again.');
            }
            throw new Error('Failed to fetch protected data.');
        }
    },

    axiosInstance: axiosInstance,
};

export default authService;
