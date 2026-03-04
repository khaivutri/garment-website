import api from './api';
import axios from 'axios';
import { LoginRequest } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface UserInfo {
    username: string;
    role: 'USER' | 'ADMIN';
}

export const authService = {
    /**
     * Đăng nhập – backend set access + refresh token vào HTTP-only cookies.
     * Response body chứa {username, role} để frontend hiển thị ngay.
     */
    async login(credentials: LoginRequest): Promise<UserInfo> {
        const response = await axios.post<UserInfo>(
            `${API_BASE_URL}/api/auth/login`,
            credentials,
            { withCredentials: true }
        );
        return response.data;
    },

    /**
     * Lấy thông tin user hiện tại từ cookie (gọi khi load trang).
     * Trả về null nếu chưa đăng nhập.
     */
    async getMe(): Promise<UserInfo | null> {
        try {
            const response = await api.get<UserInfo>('/api/auth/me');
            return response.data;
        } catch {
            return null;
        }
    },

    async logout(): Promise<void> {
        try {
            await api.post('/api/auth/logout');
        } catch {
            // Ignore errors on logout
        }
    },
};
