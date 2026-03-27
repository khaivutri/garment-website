'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Product, SortOption } from '@/types';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';

interface ProductGridProps {
    products: Product[];
    isLoading: boolean;
    error: string | null;
}

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Mới Nhất' },
    { value: 'price-asc', label: 'Giá Tăng Dần' },
    { value: 'price-desc', label: 'Giá Giảm Dần' },
    { value: 'name-asc', label: 'Tên A-Z' },
];

export default function ProductGrid({ products, isLoading, error }: ProductGridProps) {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortOption>('newest');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Collect unique categories
    const categories = useMemo(() => {
        const cats = new Map<string, string>();
        products.forEach((p) => {
            if (p.categoryId && p.categoryName) {
                cats.set(String(p.categoryId), p.categoryName);
            }
        });
        return Array.from(cats.entries());
    }, [products]);

    // Filter + sort
    const filtered = useMemo(() => {
        let result = [...products];

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.description?.toLowerCase().includes(q) ||
                    p.categoryName?.toLowerCase().includes(q)
            );
        }

        if (selectedCategory) {
            result = result.filter((p) => String(p.categoryId) === selectedCategory);
        }

        switch (sort) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                result.sort((a, b) => b.id - a.id);
        }

        return result;
    }, [products, search, selectedCategory, sort]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                    <X size={28} className="text-red-400" />
                </div>
                <div className="text-center">
                    <p className="font-semibold text-[#2d2d2d]">Đã có lỗi xảy ra</p>
                    <p className="text-sm text-[#8a8a9a] mt-1">{error}</p>
                </div>
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Thử Lại
                </Button>
            </div>
        );
    }

    return (
        <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8a9a]" />
                    <input
                        id="product-search-input"
                        type="search"
                        placeholder="Tìm sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-base !pl-9 !py-2.5 text-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a9a] hover:text-[#2d2d2d]"
                            aria-label="Xóa tìm kiếm"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    {/* Sort */}
                    <div className="relative">
                        <SlidersHorizontal size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a9a]" />
                        <select
                            id="product-sort-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOption)}
                            className="input-base !pl-8 !py-2 !pr-8 text-sm appearance-none cursor-pointer !w-auto"
                        >
                            {sortOptions.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a9a] pointer-events-none" />
                    </div>

                    {/* Result count */}
                    <p className="text-sm text-[#8a8a9a]">
                        <span className="font-semibold text-[#2d2d2d]">{filtered.length}</span> sản phẩm
                    </p>
                </div>
            </div>

            {/* Category tabs */}
            {categories.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-8">
                    <button
                        id="category-tab-all"
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!selectedCategory
                                ? 'bg-[#1a1a2e] text-white'
                                : 'bg-[#f0ebe4] text-[#5a5a6a] hover:bg-[#e8e4df]'
                            }`}
                    >
                        Tất Cả
                    </button>
                    {categories.map(([id, name]) => (
                        <button
                            key={id}
                            id={`category-tab-${id}`}
                            onClick={() => setSelectedCategory(id)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === id
                                    ? 'bg-[#1a1a2e] text-white'
                                    : 'bg-[#f0ebe4] text-[#5a5a6a] hover:bg-[#e8e4df]'
                                }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}

            {/* Grid */}
            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="text-6xl">🔍</div>
                    <div className="text-center">
                        <p className="font-display text-xl font-semibold text-[#2d2d2d]">
                            Không tìm thấy sản phẩm
                        </p>
                        <p className="text-sm text-[#8a8a9a] mt-1">
                            Thử thay đổi từ khóa hoặc danh mục
                        </p>
                    </div>
                    <Button variant="ghost" onClick={() => { setSearch(''); setSelectedCategory(null); }}>
                        Xóa bộ lọc
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filtered.map((product, i) => (
                        <div
                            key={product.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${Math.min(i * 50, 400)}ms`, opacity: 0 }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
