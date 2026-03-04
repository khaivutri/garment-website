import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#fdfaf5] flex items-center justify-center">
            <div className="text-center px-4">
                <div className="font-display text-[160px] font-bold text-[#e8e4df] leading-none select-none">
                    404
                </div>
                <h1 className="font-display text-3xl font-bold text-[#1a1a2e] -mt-6 mb-3">
                    Trang Không Tồn Tại
                </h1>
                <p className="text-[#8a8a9a] text-base mb-8 max-w-md mx-auto">
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                    Hãy quay về trang chủ để tiếp tục khám phá.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" id="not-found-home-btn" className="btn btn-primary text-[#1a1a2e] !py-3.5 !px-8">
                        <ArrowLeft size={16} /> Về Trang Chủ
                    </Link>
                    <Link href="/products" id="not-found-products-btn" className="btn btn-outline !py-3.5 !px-8">
                        Xem Sản Phẩm
                    </Link>
                </div>
            </div>
        </div>
    );
}
