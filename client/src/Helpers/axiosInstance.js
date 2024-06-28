import axios from 'axios';

const axiosInstance=axios.create();
const BASE_URL='http://localhost:5002/api/';
axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true;

axiosInstance.interceptors.response.use(
    
    (config) => {
        
        return config;
    },
    async (error) => {
      const originalRequest = error.config;
        console.log(error);
        console.log(originalRequest);
        console.log(error.response.status);
      
      
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            
            try {
                console.log("Hi")
                await axios.get(
                    "http://localhost:5002/api/refresh",
                    {
                        withCredentials: true,
                    }
                );
                
                return axiosInstance.request(originalRequest);
                
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);
export default axiosInstance;