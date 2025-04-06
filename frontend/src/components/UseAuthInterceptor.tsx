import {useEffect} from "react";
import axios from "axios";
import {getToken} from "../lib/auth";

export const useAuthInterceptor = () => {
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use((config) => {
            const token = getToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, []);
};
