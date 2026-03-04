'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Tag } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, FALLBACK_IMAGE } from '@/utils';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
    product: Product;
}

/** Ảnh từ localhost không qua Next.js Image Optimization (private IP bị chặn). */
function isLocalImage(src: string): boolean {
    return src.startsWith('http://localhost') || src.startsWith('http://127.');
}

export default function ProductCard({ product }: ProductCardProps) {
    const image = product.imageUrls?.[0] || FALLBACK_IMAGE;
    const hasMultipleImages = (product.imageUrls?.length ?? 0) > 1;
    const secondImage = hasMultipleImages ? product.imageUrls[1] : null;

    return (
        <div className="group card overflow-hidden cursor-pointer" id={`product-card-${product.id}`}>
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f4ef]">
                <Image
                    src={image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    unoptimized={isLocalImage(image)}
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                />

                {/* Second image on hover */}
                {secondImage && (
                    <Image
                        src={secondImage}
                        alt={`${product.name} - view 2`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        unoptimized={isLocalImage(secondImage)}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <Badge variant="gold" className="text-[10px] uppercase tracking-wider">
                        <Tag size={9} className="mr-1" />
                        {product.categoryName}
                    </Badge>
                </div>

                {/* Quick View Button */}
                <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Link
                        href={`/products/${product.id}`}
                        id={`product-view-btn-${product.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white/95 backdrop-blur-sm rounded-xl text-[#1a1a2e] text-sm font-semibold hover:bg-white transition-colors shadow-lg"
                    >
                        <Eye size={15} />
                        Xem Chi Tiết
                    </Link>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-display font-semibold text-[#1a1a2e] text-base leading-snug group-hover:text-[#c9a84c] transition-colors line-clamp-2 mb-0.5">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-xs text-[#8a8a9a] mb-3">
                    Chất liệu: <span className="font-medium text-[#5a5a6a]">{product.material || 'Đang cập nhật'}</span>
                </p>

                <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-[#c9a84c]">
                        {formatPrice(product.price)}
                    </span>
                    <Link
                        href={`/products/${product.id}`}
                        id={`product-detail-link-${product.id}`}
                        className="text-xs font-medium text-[#8a8a9a] hover:text-[#1a1a2e] transition-colors underline-offset-2 hover:underline"
                    >
                        Chi tiết →
                    </Link>
                </div>
            </div>
        </div>
    );
}
