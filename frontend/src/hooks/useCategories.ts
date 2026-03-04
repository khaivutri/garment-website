'use client';

import { useEffect, useState, useCallback } from 'react';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types';

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await categoryService.getAll();
            setCategories(data);
        } catch {
            setError('Không thể tải danh sách danh mục.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, isLoading, error, refetch: fetchCategories };
}
