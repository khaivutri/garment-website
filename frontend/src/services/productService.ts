import api from './api';
import { Product, ProductDTO } from '@/types';

export const productService = {
    async getAll(): Promise<Product[]> {
        const res = await api.get<Product[]>('/api/products');
        return res.data;
    },

    async getById(id: number): Promise<Product> {
        const res = await api.get<Product>(`/api/products/${id}`);
        return res.data;
    },

    async create(dto: ProductDTO): Promise<Product> {
        const res = await api.post<Product>('/api/admin/products', dto);
        return res.data;
    },

    async update(id: number, dto: ProductDTO): Promise<Product> {
        const res = await api.put<Product>(`/api/admin/products/${id}`, dto);
        return res.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/admin/products/${id}`);
    },

    /**
     * Upload ảnh sản phẩm lên server.
     * Trả về URL công khai để lưu vào imageUrls.
     */
    async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);
        const res = await api.post<{ url: string }>('/api/admin/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data.url;
    },
};

