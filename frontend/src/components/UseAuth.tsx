import { useState, useEffect } from "react";
import { getToken, removeToken, saveToken } from "../lib/auth";

export const useAuth = () => {
    const [accessToken, setAccessToken] = useState<string | null>(getToken());

    useEffect(() => {
        const stored = getToken();
        if (stored) setAccessToken(stored);
    }, []);

    const login = (token: string) => {
        saveToken(token);
        setAccessToken(token);
    };

    const logout = () => {
        removeToken();
        setAccessToken(null);
    };

    return { accessToken, login, logout, isLoggedIn: !!accessToken };
};
