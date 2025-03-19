import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL as string,
    headers: { Accept: 'application/json' }
});

http.defaults.withCredentials = true;
http.defaults.withXSRFToken = true;

http.get('sanctum/csrf-cookie');

export default http;
