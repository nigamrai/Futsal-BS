import axios from 'axios';

const axiosInstance=axios.create();
const BASE_URL='http://localhost:5002/api/';
axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;