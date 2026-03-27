'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/products/ProductGrid';

export default function ProductsPage() {
    const { products, isLoading, error } = useProducts();

    return (
        <div className="bg-[#fdfaf5] min-h-screen">
            {/* Page Header */}
            <div className="bg-white border-b border-[#e8e4df]">
                <div className="section-container py-12">
                    <p className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-2">
                        VẢI VIỆT FASHION HOUSE
                    </p>
                    <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
                        Tất Cả Sản Phẩm
                    </h1>
                    <p className="text-[#8a8a9a] mt-2 max-w-xl">
                        Khám phá bộ sưu tập thời trang đa dạng — từ trang phục công sở lịch sự đến
                        casual năng động, mang đậm bản sắc Việt Nam.
                    </p>
                </div>
            </div>

            {/* Products */}
            <div className="section-container py-12">
                <ProductGrid products={products} isLoading={isLoading} error={error} />
            </div>
        </div>
    );
}
