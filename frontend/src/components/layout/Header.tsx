'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Menu,
    X,
    ShoppingBag,
    Search,
    User,
    LogOut,
    LayoutDashboard,
    ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils';

const navLinks = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/products', label: 'Sản Phẩm' },
    { href: '/about', label: 'Về Chúng Tôi' },
    { href: '/contact', label: 'Liên Hệ' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false);
        setIsProfileOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const isHomePage = pathname === '/';
    const transparentBg = isHomePage && !isScrolled && !isMobileOpen;

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
                    transparentBg
                        ? 'bg-transparent'
                        : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#e8e4df]/60'
                )}
                style={{ height: 'var(--header-height)' }}
            >
                <div className="section-container h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" id="header-logo" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <ShoppingBag size={18} className="text-[#1a1a2e]" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span
                                className={cn(
                                    'font-display font-bold text-lg tracking-wide transition-colors',
                                    transparentBg ? 'text-white' : 'text-[#1a1a2e]'
                                )}
                            >
                                VẢI VIỆT
                            </span>
                            <span
                                className={cn(
                                    'text-[10px] font-medium tracking-[0.15em] uppercase transition-colors',
                                    transparentBg ? 'text-white/60' : 'text-[#c9a84c]'
                                )}
                            >
                                Fashion House
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                    pathname === link.href
                                        ? transparentBg
                                            ? 'text-[#c9a84c]'
                                            : 'text-[#c9a84c] bg-[#c9a84c]/08'
                                        : transparentBg
                                            ? 'text-white/80 hover:text-white hover:bg-white/10'
                                            : 'text-[#5a5a6a] hover:text-[#1a1a2e] hover:bg-[#f0ebe4]'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/products"
                            id="header-search-btn"
                            className={cn(
                                'p-2.5 rounded-xl transition-all',
                                transparentBg
                                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                                    : 'text-[#5a5a6a] hover:text-[#1a1a2e] hover:bg-[#f0ebe4]'
                            )}
                            aria-label="Tìm kiếm"
                        >
                            <Search size={20} />
                        </Link>

                        {isAuthenticated && user ? (
                            <div className="relative">
                                <button
                                    id="header-profile-btn"
                                    onClick={() => setIsProfileOpen((v) => !v)}
                                    className={cn(
                                        'flex items-center gap-2 px-3 py-2 rounded-xl transition-all',
                                        transparentBg
                                            ? 'text-white/80 hover:text-white hover:bg-white/10'
                                            : 'text-[#5a5a6a] hover:text-[#1a1a2e] hover:bg-[#f0ebe4]'
                                    )}
                                >
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] flex items-center justify-center">
                                        <span className="text-xs font-bold text-[#1a1a2e]">
                                            {(user.username?.[0] ?? '?').toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium">{user.username}</span>
                                    <ChevronDown size={14} className={cn('transition-transform', isProfileOpen && 'rotate-180')} />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#e8e4df] py-2 animate-scale-in">
                                        {isAdmin && (
                                            <Link
                                                href="/admin"
                                                id="profile-admin-link"
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2d2d2d] hover:bg-[#f8f4ef] transition-colors"
                                            >
                                                <LayoutDashboard size={16} className="text-[#c9a84c]" />
                                                Quản Trị
                                            </Link>
                                        )}
                                        <Link
                                            href="/profile"
                                            id="profile-page-link"
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2d2d2d] hover:bg-[#f8f4ef] transition-colors"
                                        >
                                            <User size={16} className="text-[#8a8a9a]" />
                                            Tài Khoản
                                        </Link>
                                        <hr className="my-1 border-[#e8e4df]" />
                                        <button
                                            id="profile-logout-btn"
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Đăng Xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    id="header-login-btn"
                                    className={cn(
                                        'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                                        transparentBg
                                            ? 'text-white/80 hover:text-white hover:bg-white/10'
                                            : 'text-[#5a5a6a] hover:text-[#1a1a2e] hover:bg-[#f0ebe4]'
                                    )}
                                >
                                    Đăng Nhập
                                </Link>
                                <Link href="/products" id="header-shop-btn" className="btn btn-primary text-[#1a1a2e] !py-2 !px-5 !text-sm">
                                    Mua Sắm
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        id="header-mobile-toggle"
                        onClick={() => setIsMobileOpen((v) => !v)}
                        className={cn(
                            'md:hidden p-2.5 rounded-xl transition-all',
                            transparentBg
                                ? 'text-white hover:bg-white/10'
                                : 'text-[#2d2d2d] hover:bg-[#f0ebe4]'
                        )}
                        aria-label="Toggle menu"
                    >
                        {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <div className="absolute top-[72px] left-0 right-0 bg-white shadow-2xl rounded-b-3xl pb-6 animate-fade-in-up">
                        <nav className="flex flex-col px-6 pt-4 gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                                        pathname === link.href
                                            ? 'bg-[#f8f4ef] text-[#c9a84c] font-semibold'
                                            : 'text-[#5a5a6a] hover:bg-[#f8f4ef] hover:text-[#1a1a2e]'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="px-6 pt-4 border-t border-[#e8e4df] mt-4 flex flex-col gap-3">
                            {isAuthenticated ? (
                                <>
                                    <p className="text-xs text-[#8a8a9a] font-medium">
                                        Đăng nhập với tư cách <strong className="text-[#2d2d2d]">{user?.username}</strong>
                                    </p>
                                    {isAdmin && (
                                        <Link href="/admin" className="btn btn-dark text-white w-full justify-center !py-2.5">
                                            <LayoutDashboard size={16} /> Quản Trị
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="btn bg-red-500 text-white w-full justify-center !py-2.5 hover:bg-red-600 transition-colors"
                                    >
                                        <LogOut size={16} /> Đăng Xuất
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="btn btn-outline w-full justify-center !py-2.5">
                                        Đăng Nhập
                                    </Link>
                                    <Link href="/products" className="btn btn-primary text-[#1a1a2e] w-full justify-center !py-2.5">
                                        Mua Sắm Ngay
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
