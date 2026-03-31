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
                {/* FIX 1: Thêm paddingTop: 160px để không bị che chữ "Chúng Tôi Luôn Lắng Nghe" */}
                <div className="bg-white border-b border-[#e8e4df]" style={{ paddingTop: '160px', paddingBottom: '60px' }}>
                    <div className="section-container text-center">
                        <p className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-2">Liên Hệ</p>
                        <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#1a1a2e]" style={{ marginBottom: '16px' }}>
                            Chúng Tôi Luôn Lắng Nghe
                        </h1>
                        <p className="text-[#8a8a9a] max-w-xl mx-auto">
                            Bạn có câu hỏi, góp ý hay muốn hợp tác? Hãy liên hệ với chúng tôi ngay!
                        </p>
                    </div>
                </div>

                <div className="section-container" style={{ padding: '80px 20px' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                        {/* Info */}
                        {/* FIX 2: Ép dùng flex-col và gap-32px để giãn khoảng cách các cục thông tin */}
                        <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {contactInfo.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="card flex items-start" style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', display: 'flex', gap: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                                    <div className="rounded-2xl flex items-center justify-center flex-shrink-0" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(201, 168, 76, 0.1)' }}>
                                        <Icon size={24} className="text-[#c9a84c]" color="#c9a84c" />
                                    </div>
                                    <div>
                                        <p className="font-semibold uppercase tracking-wide" style={{ fontSize: '12px', color: '#8a8a9a', marginBottom: '4px' }}>{label}</p>
                                        <p className="font-medium text-[#1a1a2e]" style={{ fontSize: '15px' }}>{value}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Map placeholder */}
                            <div className="rounded-2xl overflow-hidden relative" style={{ height: '280px', borderRadius: '16px', border: '1px solid #e8e4df', marginTop: '16px' }}>
                                <iframe
                                    src="https://maps.google.com/maps?q=123%20Lê%20Lợi,%20Quận%201,%20Hồ%20Chí%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    className="w-full h-full border-0"
                                    style={{ width: '100%', height: '100%' }}
                                    loading="lazy"
                                    title="Bản đồ VẢI VIỆT"
                                />
                            </div>
                        </div>

                        {/* Form */}
                        {/* FIX 3: Thêm marginTop: 40px để đẩy cục gửi tin nhắn xuống cho thoáng */}
                        <div className="lg:col-span-3" style={{ marginTop: '40px' }}>
                            <div className="card" style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
                                <h2 className="font-display font-bold text-[#1a1a2e]" style={{ fontSize: '1.75rem', marginBottom: '32px' }}>
                                    Gửi Tin Nhắn
                                </h2>
                                <form id="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} noValidate>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
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
                                        <label htmlFor="contact-message" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2d2d2d', marginBottom: '8px' }}>
                                            Tin Nhắn *
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            placeholder="Nội dung tin nhắn của bạn..."
                                            rows={6}
                                            value={form.message}
                                            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                                            className="input-base resize-none"
                                            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ marginTop: '8px' }}>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            isLoading={isSending}
                                            id="contact-submit-btn"
                                            style={{ width: '100%', backgroundColor: '#c9a84c', color: '#1a1a2e', padding: '16px', borderRadius: '99px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}
                                        >
                                            <Send size={18} />
                                            {isSending ? 'Đang Gửi...' : 'Gửi Tin Nhắn'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}