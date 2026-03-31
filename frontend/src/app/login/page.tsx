'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ToastContainer from '@/components/ui/ToastContainer';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const { toasts, show, dismiss } = useToast();
    const router = useRouter();

    const validate = () => {
        const errs: typeof errors = {};
        if (!username.trim()) errs.username = 'Vui lòng nhập tên đăng nhập';
        if (!password) errs.password = 'Vui lòng nhập mật khẩu';
        else if (password.length < 4) errs.password = 'Mật khẩu tối thiểu 4 ký tự';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        try {
            await login(username, password);
            show('Đăng nhập thành công! Đang chuyển hướng...', 'success');
            setTimeout(() => router.push('/'), 1000);
        } catch {
            show('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer toasts={toasts} dismiss={dismiss} />

            <div
                className="min-h-screen -mt-[72px] flex"
                style={{
                    display: 'flex',
                    paddingTop: '72px', /* Đẩy toàn bộ nội dung xuống dưới Header */
                    minHeight: '100vh',
                    backgroundColor: '#1a1a2e' /* Màu nền tối để tiệp với Footer */
                }}
            >
                {/* Left Panel */}
                <div
                    className="hidden lg:flex flex-col justify-between w-1/2 p-14 relative overflow-hidden"
                    style={{
                        background: 'var(--gradient-hero)',
                        padding: '56px', /* Thêm dòng này để đẩy toàn bộ nội dung cách xa mép màn hình */
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    {/* BG decoration */}
                    <div className="absolute inset-0 pointer-events-none">
                        <img
                            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80"
                            alt=""
                            className="w-full h-full object-cover opacity-15"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/50 to-[#1a1a2e]" />
                    </div>

                    <Link href="/" className="flex items-center gap-2.5 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] flex items-center justify-center">
                            <ShoppingBag size={20} className="text-[#1a1a2e]" strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="font-display font-bold text-xl text-white tracking-wide">VẢI VIỆT</span>
                            <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#c9a84c]">Fashion House</p>
                        </div>
                    </Link>

                    <div className="relative z-10">
                        <h2 className="font-display text-5xl font-bold text-white mb-4 leading-tight">
                            Chào Mừng
                            <br />
                            <span className="text-gradient-gold">Trở Lại</span>
                        </h2>
                        <p className="text-white/60 text-base leading-relaxed max-w-xs">
                            Đăng nhập để trải nghiệm mua sắm thời trang cao cấp và theo dõi đơn hàng của bạn.
                        </p>

                        <div className="mt-10 grid grid-cols-3 gap-5">
                            {[
                                { value: '500+', label: 'Sản phẩm' },
                                { value: '10K+', label: 'Khách hàng' },
                                { value: '98%', label: 'Hài lòng' },
                            ].map((s) => (
                                <div key={s.label}>
                                    <p className="font-display text-3xl font-bold text-gradient-gold">{s.value}</p>
                                    <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-white/30 text-xs relative z-10">
                        © {new Date().getFullYear()} VẢI VIỆT Fashion House
                    </p>
                </div>

                {/* Right Panel */}
                <div
                    className="flex-1 flex items-center justify-center p-8 bg-[#fdfaf5]"
                    style={{
                        flex: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fdfaf5',
                        marginBottom: '40px', /* Thụt mảng trắng lên cách xa Footer 40px */
                        borderBottomLeftRadius: '32px' /* Bo tròn góc dưới bên trái nhìn cho "nghệ" */
                    }}
                >
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-2.5 mb-10">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] flex items-center justify-center">
                                <ShoppingBag size={18} className="text-[#1a1a2e]" strokeWidth={2.5} />
                            </div>
                            <span className="font-display font-bold text-xl text-[#1a1a2e]">VẢI VIỆT</span>
                        </div>

                        <div className="mb-10">
                            <h1 className="font-display text-3xl font-bold text-[#1a1a2e]">Đăng Nhập</h1>
                            <p className="text-[#8a8a9a] mt-1.5 text-sm">
                                Nhập thông tin tài khoản để tiếp tục
                            </p>
                        </div>

                        <form id="login-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
                            <Input
                                id="login-username"
                                label="Tên Đăng Nhập"
                                type="text"
                                placeholder="Nhập tên đăng nhập"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setErrors((p) => ({ ...p, username: undefined }));
                                }}
                                error={errors.username}
                                leftIcon={<User size={16} />}
                                autoComplete="username"
                                autoFocus
                            />

                            <Input
                                id="login-password"
                                label="Mật Khẩu"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors((p) => ({ ...p, password: undefined }));
                                }}
                                error={errors.password}
                                leftIcon={<Lock size={16} />}
                                rightIcon={
                                    <button
                                        type="button"
                                        id="toggle-password-visibility"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="hover:text-[#2d2d2d] transition-colors"
                                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                }
                                autoComplete="current-password"
                            />

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        id="login-remember-me"
                                        type="checkbox"
                                        className="w-4 h-4 rounded accent-[#c9a84c] cursor-pointer"
                                    />
                                    <span className="text-[#5a5a6a]">Ghi nhớ đăng nhập</span>
                                </label>
                                <a href="#" className="text-[#c9a84c] hover:text-[#996f1c] font-medium transition-colors">
                                    Quên mật khẩu?
                                </a>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full mt-2"
                                id="login-submit-btn"
                                rightIcon={!isLoading ? <ArrowRight size={16} /> : undefined}
                            >
                                {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-[#8a8a9a]">
                                Chưa có tài khoản?{' '}
                                <Link href="/products" className="text-[#c9a84c] font-semibold hover:text-[#996f1c] transition-colors">
                                    Mua sắm ngay
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-[#e8e4df]">
                            <div className="grid grid-cols-3 gap-4 text-center text-xs text-[#8a8a9a]">
                                {['🔒 Bảo mật SSL', '🛡️ Dữ liệu an toàn', '✅ Đã xác minh'].map((t) => (
                                    <p key={t}>{t}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
