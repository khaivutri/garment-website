'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';
import ToastContainer from '@/components/ui/ToastContainer';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSending, setIsSending] = useState(false);
    const { toasts, show, dismiss } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            show('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }
        setIsSending(true);
        await new Promise((r) => setTimeout(r, 1500));
        show('Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi trong 24h.', 'success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setIsSending(false);
    };

    const contactInfo = [
        { icon: MapPin, label: 'Địa Chỉ', value: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh' },
        { icon: Phone, label: 'Hotline', value: '+84 90 123 4567' },
        { icon: Mail, label: 'Email', value: 'info@vaiviet.vn' },
        { icon: Clock, label: 'Giờ Làm Việc', value: 'Thứ 2 – Thứ 7: 9:00 – 18:00' },
    ];

    return (
        <>
            <ToastContainer toasts={toasts} dismiss={dismiss} />

            <div className="bg-[#fdfaf5] min-h-screen">
                {/* Header */}
                <div className="bg-white border-b border-[#e8e4df]">
                    <div className="section-container py-14 text-center">
                        <p className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-2">Liên Hệ</p>
                        <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
                            Chúng Tôi Luôn Lắng Nghe
                        </h1>
                        <p className="text-[#8a8a9a] mt-3 max-w-xl mx-auto">
                            Bạn có câu hỏi, góp ý hay muốn hợp tác? Hãy liên hệ với chúng tôi ngay!
                        </p>
                    </div>
                </div>

                <div className="section-container py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        {/* Info */}
                        <div className="lg:col-span-2 space-y-5">
                            {contactInfo.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="card p-5 flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                                        <Icon size={20} className="text-[#c9a84c]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-[#8a8a9a] uppercase tracking-wide mb-1">{label}</p>
                                        <p className="font-medium text-[#1a1a2e] text-sm">{value}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Map placeholder */}
                            <div className="rounded-2xl overflow-hidden h-52 bg-[#e8e4df] relative">
                                <iframe
                                    src="https://maps.google.com/maps?q=Ho+Chi+Minh+City&output=embed"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    title="Bản đồ VẢI VIỆT"
                                />
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-3">
                            <div className="card p-8">
                                <h2 className="font-display text-2xl font-bold text-[#1a1a2e] mb-6">
                                    Gửi Tin Nhắn
                                </h2>
                                <form id="contact-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <Input
                                            id="contact-name"
                                            label="Họ và Tên *"
                                            placeholder="Nguyễn Văn A"
                                            value={form.name}
                                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                        />
                                        <Input
                                            id="contact-email"
                                            label="Email *"
                                            type="email"
                                            placeholder="email@example.com"
                                            value={form.email}
                                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                        />
                                    </div>
                                    <Input
                                        id="contact-subject"
                                        label="Chủ Đề"
                                        placeholder="Tôi muốn hỏi về..."
                                        value={form.subject}
                                        onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                                    />
                                    <div>
                                        <label htmlFor="contact-message" className="text-sm font-semibold text-[#2d2d2d] block mb-1.5">
                                            Tin Nhắn *
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            placeholder="Nội dung tin nhắn của bạn..."
                                            rows={5}
                                            value={form.message}
                                            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                                            className="input-base resize-none"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        isLoading={isSending}
                                        id="contact-submit-btn"
                                        className="w-full"
                                        leftIcon={<Send size={16} />}
                                    >
                                        {isSending ? 'Đang Gửi...' : 'Gửi Tin Nhắn'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
