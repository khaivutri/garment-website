'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft,
    Tag,
    Package,
    ChevronLeft,
    ChevronRight,
    Star,
    Share2,
    Heart,
} from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { formatPrice, FALLBACK_IMAGE } from '@/utils';
import { ProductDetailSkeleton } from '@/components/ui/Skeleton';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const { product, isLoading, error } = useProduct(id);

    const [activeImg, setActiveImg] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    if (isLoading) {
        return (
            <div className="section-container py-14">
                <ProductDetailSkeleton />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="section-container py-24 text-center">
                <p className="font-display text-2xl text-[#1a1a2e] mb-2">Không tìm thấy sản phẩm</p>
                <p className="text-[#8a8a9a] mb-8">{error ?? 'Sản phẩm không tồn tại hoặc đã bị xóa.'}</p>
                <Button variant="dark" onClick={() => router.push('/products')}>
                    <ArrowLeft size={16} /> Quay Lại
                </Button>
            </div>
        );
    }

    const images = product.imageUrls?.length ? product.imageUrls : [FALLBACK_IMAGE];

    const prevImg = () => setActiveImg((p) => (p - 1 + images.length) % images.length);
    const nextImg = () => setActiveImg((p) => (p + 1) % images.length);

    return (
        <div className="bg-[#fdfaf5] min-h-screen py-10">
            <div className="section-container">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#8a8a9a] mb-8">
                    <Link href="/" className="hover:text-[#c9a84c] transition-colors">Trang Chủ</Link>
                    <ChevronRight size={14} />
                    <Link href="/products" className="hover:text-[#c9a84c] transition-colors">Sản Phẩm</Link>
                    <ChevronRight size={14} />
                    <span className="text-[#2d2d2d] font-medium line-clamp-1">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main image */}
                        <div
                            className="relative aspect-square rounded-3xl overflow-hidden bg-[#f8f4ef] shadow-lg"
                            id="product-main-image"
                        >
                            <Image
                                src={images[activeImg]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                                }}
                            />

                            {images.length > 1 && (
                                <>
                                    <button
                                        id="img-prev-btn"
                                        onClick={prevImg}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                      bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center
                      hover:bg-white transition-colors"
                                        aria-label="Ảnh trước"
                                    >
                                        <ChevronLeft size={20} className="text-[#1a1a2e]" />
                                    </button>
                                    <button
                                        id="img-next-btn"
                                        onClick={nextImg}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                      bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center
                      hover:bg-white transition-colors"
                                        aria-label="Ảnh tiếp"
                                    >
                                        <ChevronRight size={20} className="text-[#1a1a2e]" />
                                    </button>

                                    {/* Dot indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, i) => (
                                            <button
                                                key={i}
                                                id={`img-dot-${i}`}
                                                onClick={() => setActiveImg(i)}
                                                className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? 'bg-white w-6' : 'bg-white/50'
                                                    }`}
                                                aria-label={`Ảnh ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        id={`img-thumb-${i}`}
                                        onClick={() => setActiveImg(i)}
                                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${i === activeImg
                                                ? 'border-[#c9a84c] shadow-md'
                                                : 'border-transparent hover:border-[#c9a84c]/40'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col" id="product-info">
                        {/* Category & actions */}
                        <div className="flex items-center justify-between mb-4">
                            <Badge variant="gold">
                                <Tag size={11} className="mr-1.5" />
                                {product.categoryName}
                            </Badge>
                            <div className="flex gap-2">
                                <button
                                    id="product-share-btn"
                                    onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                                    className="w-9 h-9 rounded-xl bg-[#f0ebe4] flex items-center justify-center
                    hover:bg-[#e8e4df] transition-colors text-[#5a5a6a]"
                                    aria-label="Chia sẻ"
                                >
                                    <Share2 size={16} />
                                </button>
                                <button
                                    id="product-wishlist-btn"
                                    onClick={() => setIsWishlisted((v) => !v)}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isWishlisted
                                            ? 'bg-red-50 text-red-500'
                                            : 'bg-[#f0ebe4] text-[#5a5a6a] hover:bg-red-50 hover:text-red-400'
                                        }`}
                                    aria-label="Yêu thích"
                                >
                                    <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                        </div>

                        {/* Name */}
                        <h1 className="font-display text-3xl lg:text-4xl font-bold text-[#1a1a2e] leading-tight mb-3">
                            {product.name}
                        </h1>

                        {/* Stars (decorative) */}
                        <div className="flex items-center gap-2 mb-5">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={15} fill={i < 4 ? '#c9a84c' : 'none'} className="text-[#c9a84c]" />
                                ))}
                            </div>
                            <span className="text-sm text-[#8a8a9a]">4.8 · 128 đánh giá</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="font-display text-4xl font-bold text-[#c9a84c]">
                                {formatPrice(product.price)}
                            </span>
                        </div>

                        <hr className="border-[#e8e4df] mb-6" />

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="font-semibold text-[#1a1a2e] text-sm mb-2">Mô Tả</h2>
                            <p className="text-[#5a5a6a] text-sm leading-relaxed">
                                {product.description || 'Sản phẩm cao cấp từ VẢI VIỆT Fashion House, được làm từ chất liệu tốt nhất và thiết kế tinh tế.'}
                            </p>
                        </div>

                        {/* Material */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-[#f8f4ef] rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Package size={15} className="text-[#c9a84c]" />
                                    <span className="text-xs font-semibold text-[#8a8a9a] uppercase tracking-wide">Chất Liệu</span>
                                </div>
                                <p className="font-semibold text-[#1a1a2e] text-sm">
                                    {product.material || 'Cao cấp'}
                                </p>
                            </div>
                            <div className="bg-[#f8f4ef] rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Tag size={15} className="text-[#c9a84c]" />
                                    <span className="text-xs font-semibold text-[#8a8a9a] uppercase tracking-wide">Danh Mục</span>
                                </div>
                                <p className="font-semibold text-[#1a1a2e] text-sm">{product.categoryName}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-auto">
                            <Button
                                variant="primary"
                                size="lg"
                                className="flex-1"
                                id="product-add-to-cart-btn"
                                onClick={() => alert('Tính năng giỏ hàng sẽ được cập nhật sớm!')}
                            >
                                Thêm Vào Giỏ
                            </Button>
                            <Button
                                variant="dark"
                                size="lg"
                                className="flex-1"
                                id="product-buy-now-btn"
                                onClick={() => alert('Tính năng đặt hàng sẽ được cập nhật sớm!')}
                            >
                                Mua Ngay
                            </Button>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-6 pt-6 border-t border-[#e8e4df] grid grid-cols-3 gap-4 text-center">
                            {['🚚 Miễn Phí Ship', '🔄 Đổi Trả 30 Ngày', '🔒 Bảo Mật 100%'].map((item) => (
                                <p key={item} className="text-xs text-[#8a8a9a] font-medium">{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
