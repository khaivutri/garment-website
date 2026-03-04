'use client';

import { useEffect, useState, useCallback } from 'react';
import { productService } from '@/services/productService';
import { Product, SortOption } from '@/types';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await productService.getAll();
            setProducts(data);
        } catch {
            setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const sortProducts = (option: SortOption): Product[] => {
        const sorted = [...products];
        switch (option) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return sorted.sort((a, b) => b.id - a.id);
        }
    };

    const filterByCategory = (categoryId: number | null): Product[] => {
        if (!categoryId) return products;
        return products.filter((p) => p.categoryId === categoryId);
    };

    return {
        products,
        isLoading,
        error,
        refetch: fetchProducts,
        sortProducts,
        filterByCategory,
    };
}

export function useProduct(id: number) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            try {
                setIsLoading(true);
                const data = await productService.getById(id);
                setProduct(data);
            } catch {
                setError('Không thể tải thông tin sản phẩm.');
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [id]);

    return { product, isLoading, error };
}
