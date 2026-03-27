import api from './api';
import { Category } from '@/types';

export interface CategoryDTO {
    name: string;
    description: string;
}

export const categoryService = {
    async getAll(): Promise<Category[]> {
        const res = await api.get<Category[]>('/api/categories');
        return res.data;
    },

    async getById(id: number): Promise<Category> {
        const res = await api.get<Category>(`/api/categories/${id}`);
        return res.data;
    },

    async create(dto: CategoryDTO): Promise<Category> {
        const res = await api.post<Category>('/api/admin/categories', dto);
        return res.data;
    },

    async update(id: number, dto: CategoryDTO): Promise<Category> {
        const res = await api.put<Category>(`/api/admin/categories/${id}`, dto);
        return res.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/admin/categories/${id}`);
    },
};
