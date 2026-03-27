'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, UserInfo } from '@/services/authService';

interface AuthContextType {
    user: UserInfo | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // On page load, call /api/auth/me to restore session from HTTP-only cookie.
        // No localStorage involved — the cookie is sent automatically.
        authService.getMe().then((info) => {
            setUser(info);
            setIsLoading(false);
        });
    }, []);

    const login = async (username: string, password: string) => {
        const info = await authService.login({ username, password });
        setUser(info);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!(user && user.username),
        isAdmin: user?.role === 'ADMIN',
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
