'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Shield, LogOut, ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getInitials } from '@/utils';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || !user) return null;

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <div className="bg-[#fdfaf5] min-h-screen py-12">
            <div className="section-container max-w-2xl">
                <div className="card p-10 text-center">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c97a]
            flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <span className="font-display font-bold text-3xl text-[#1a1a2e]">
                            {getInitials(user.username)}
                        </span>
                    </div>

                    <h1 className="font-display text-3xl font-bold text-[#1a1a2e] mb-1">
                        {user.username}
                    </h1>

                    <div className="flex justify-center mt-2 mb-8">
                        <Badge variant={user.role === 'ADMIN' ? 'gold' : 'neutral'}>
                            {user.role === 'ADMIN' ? (
                                <><Shield size={11} className="mr-1.5" /> Quản Trị Viên</>
                            ) : (
                                <><User size={11} className="mr-1.5" /> Thành Viên</>
                            )}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-10 py-8 border-y border-[#e8e4df]">
                        {[
                            { label: 'Đơn Hàng', value: '—' },
                            { label: 'Yêu Thích', value: '—' },
                            { label: 'Đánh Giá', value: '—' },
                        ].map((s) => (
                            <div key={s.label}>
                                <p className="font-display text-2xl font-bold text-[#1a1a2e]">{s.value}</p>
                                <p className="text-xs text-[#8a8a9a] mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            variant="dark"
                            size="lg"
                            className="w-full"
                            id="profile-shop-btn"
                            onClick={() => router.push('/products')}
                            leftIcon={<ShoppingBag size={17} />}
                        >
                            Tiếp Tục Mua Sắm
                        </Button>
                        {user.role === 'ADMIN' && (
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full"
                                id="profile-admin-dashboard-btn"
                                onClick={() => router.push('/admin')}
                                leftIcon={<Shield size={17} />}
                            >
                                Mở Trang Quản Trị
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="lg"
                            className="w-full text-red-500 hover:bg-red-50"
                            id="profile-logout-btn"
                            onClick={handleLogout}
                            leftIcon={<LogOut size={17} />}
                        >
                            Đăng Xuất
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
