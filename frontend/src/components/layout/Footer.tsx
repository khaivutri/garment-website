'use client';

import Link from 'next/link';
import { ShoppingBag, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
    Sản_Phẩm: [
        { href: '/products', label: 'Tất Cả Sản Phẩm' },
        { href: '/products?category=1', label: 'Áo' },
        { href: '/products?category=2', label: 'Quần' },
        { href: '/products?category=3', label: 'Váy & Đầm' },
        { href: '/products?category=4', label: 'Phụ Kiện' },
    ],
    'Về Chúng Tôi': [
        { href: '/about', label: 'Câu Chuyện Thương Hiệu' },
        { href: '/about#team', label: 'Đội Ngũ' },
        { href: '/about#values', label: 'Giá Trị Cốt Lõi' },
        { href: '/contact', label: 'Liên Hệ' },
    ],
    'Hỗ Trợ': [
        { href: '/faq', label: 'FAQ' },
        { href: '/policy', label: 'Chính Sách Đổi Trả' },
        { href: '/shipping', label: 'Vận Chuyển' },
        { href: '/size-guide', label: 'Hướng Dẫn Size' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#1a1a2e] text-white/80">
            {/* Newsletter Banner */}
            <div className="border-b border-white/10">
                <div className="section-container py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-display text-2xl text-white font-bold">
                                Nhận Ưu Đãi Độc Quyền
                            </h3>
                            <p className="text-white/60 text-sm mt-1">
                                Đăng ký để nhận thông tin bộ sưu tập mới và khuyến mãi đặc biệt
                            </p>
                        </div>
                        <form
                            id="footer-newsletter-form"
                            onSubmit={(e) => e.preventDefault()}
                            className="flex gap-3 w-full md:w-auto"
                        >
                            <input
                                id="footer-newsletter-email"
                                type="email"
                                placeholder="Địa chỉ email của bạn"
                                className="input-base bg-white/10 !border-white/20 text-white placeholder:text-white/40
                  focus:!border-[#c9a84c] focus:!shadow-[0_0_0_3px_rgba(201,168,76,0.2)] flex-1 md:w-64"
                            />
                            <button
                                type="submit"
                                id="footer-newsletter-submit"
                                className="btn btn-primary text-[#1a1a2e] flex-shrink-0"
                            >
                                Đăng Ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="section-container py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 group w-fit">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] flex items-center justify-center">
                                <ShoppingBag size={18} className="text-[#1a1a2e]" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-display font-bold text-lg tracking-wide text-white">
                                    VẢI VIỆT
                                </span>
                                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#c9a84c]">
                                    Fashion House
                                </span>
                            </div>
                        </Link>

                        <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-xs">
                            Thương hiệu thời trang Việt Nam với thiết kế hiện đại, chất liệu cao cấp và
                            phong cách đậm bản sắc dân tộc.
                        </p>

                        <div className="flex flex-col gap-2.5 mt-6 text-sm">
                            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2.5 text-white/50 hover:text-[#c9a84c] transition-colors">
                                <MapPin size={15} className="flex-shrink-0" />
                                123 Đường Lê Lợi, Q.1, TP.HCM
                            </a>
                            <a href="tel:+84901234567"
                                className="flex items-center gap-2.5 text-white/50 hover:text-[#c9a84c] transition-colors">
                                <Phone size={15} className="flex-shrink-0" />
                                +84 90 123 4567
                            </a>
                            <a href="mailto:info@vaiviet.vn"
                                className="flex items-center gap-2.5 text-white/50 hover:text-[#c9a84c] transition-colors">
                                <Mail size={15} className="flex-shrink-0" />
                                info@vaiviet.vn
                            </a>
                        </div>

                        {/* Social icons */}
                        <div className="flex gap-3 mt-6">
                            {[
                                { icon: Facebook, label: 'Facebook', href: '#' },
                                { icon: Instagram, label: 'Instagram', href: '#' },
                                { icon: Youtube, label: 'Youtube', href: '#' },
                            ].map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-xl bg-white/08 flex items-center justify-center
                    hover:bg-[#c9a84c] hover:text-[#1a1a2e] text-white/50 transition-all duration-300
                    hover:scale-110 hover:shadow-md"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                                {title.replace('_', ' ')}
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-white/50 text-sm hover:text-[#c9a84c] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-white/40 text-xs">
                        © {new Date().getFullYear()} VẢI VIỆT Fashion House. All rights reserved.
                    </p>
                    <div className="flex gap-5">
                        {['Điều Khoản', 'Bảo Mật', 'Cookie'].map((item) => (
                            <Link key={item} href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
