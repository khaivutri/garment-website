import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Leaf, Globe2, Award } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Về Chúng Tôi',
    description: 'Câu chuyện về VẢI VIỆT Fashion House — thương hiệu thời trang Việt Nam cao cấp.',
};

const values = [
    { icon: Heart, title: 'Đam Mê Sáng Tạo', desc: 'Mỗi thiết kế đều xuất phát từ tình yêu với nghệ thuật và văn hóa Việt Nam.' },
    { icon: Leaf, title: 'Phát Triển Bền Vững', desc: 'Chúng tôi cam kết sử dụng chất liệu thân thiện môi trường và quy trình sản xuất có trách nhiệm.' },
    { icon: Globe2, title: 'Bản Sắc Dân Tộc', desc: 'Giữ gìn và phát huy vẻ đẹp văn hóa Việt trên bản đồ thời trang thế giới.' },
    { icon: Award, title: 'Chất Lượng Vượt Trội', desc: 'Tiêu chuẩn cao nhất trong từng chi tiết nhỏ, từ chất liệu đến đường may.' },
];

const team = [
    { name: 'Nguyễn Thị Mai', role: 'Founder & Creative Director', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b902?w=300&q=80' },
    { name: 'Trần Văn Hùng', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { name: 'Lê Thị Phương', role: 'Production Manager', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
];

export default function AboutPage() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', color: '#5a5a6a' }}>
            {/* Hero Section */}
            <section
                style={{
                    position: 'relative',
                    /* FIX 1: Tăng padding-top lên 200px để tránh bị Header che khuất */
                    padding: '200px 20px 120px 20px',
                    background: 'linear-gradient(135deg, #0e1227 0%, #1a1a2e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    textAlign: 'center'
                }}
                aria-label="About hero"
            >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                    <img
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ color: '#c9a84c', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        Về Chúng Tôi
                    </p>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 'bold', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                        Chúng Tôi Là <span style={{ color: '#c9a84c' }}>VẢI VIỆT</span>
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Thương hiệu thời trang Việt Nam ra đời từ tình yêu với văn hóa dân tộc và khát vọng
                        mang vẻ đẹp Việt ra thế giới.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section style={{ padding: '120px 20px', backgroundColor: '#ffffff' }} id="story" aria-labelledby="story-heading">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* FIX 2: Dùng Grid với gap lớn (80px) để tách chữ và ảnh ra cho thoáng */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: '#c9a84c', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Câu Chuyện</p>
                            <h2 id="story-heading" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                                Từ Làng Nghề Đến Sàn Diễn Quốc Tế
                            </h2>
                            <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                                VẢI VIỆT được thành lập năm 2018 bởi nhà thiết kế Nguyễn Thị Mai — người có hơn 15 năm
                                kinh nghiệm trong ngành thời trang quốc tế. Với tầm nhìn là tôn vinh di sản dệt may Việt Nam,
                                bà đã quy tụ những nghệ nhân tài hoa từ khắp mọi miền đất nước.
                            </p>
                            <p style={{ lineHeight: 1.8, marginBottom: '2.5rem' }}>
                                Ngày nay, VẢI VIỆT có mặt tại hơn 10 thành phố và xuất khẩu sang 5 quốc gia,
                                mang thời trang thuần Việt đến với người yêu thời trang toàn cầu.
                            </p>
                            <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#c9a84c', color: '#1a1a2e', padding: '14px 28px', borderRadius: '99px', fontWeight: 'bold', textDecoration: 'none' }}>
                                Khám Phá Bộ Sưu Tập
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <img src="https://images.unsplash.com/photo-1594938298603-c8148c4b4de2?w=400&q=80" alt="Workshop" style={{ borderRadius: '16px', objectFit: 'cover', width: '100%', height: '300px' }} />
                            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" alt="Fabric" style={{ borderRadius: '16px', objectFit: 'cover', width: '100%', height: '300px', marginTop: '40px' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section style={{ padding: '120px 20px', backgroundColor: '#fdfaf5' }} id="values" aria-labelledby="values-heading">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <p style={{ color: '#c9a84c', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Triết Lý</p>
                        <h2 id="values-heading" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1a2e' }}>
                            Giá Trị Cốt Lõi
                        </h2>
                    </div>
                    {/* FIX 3: Tăng gap giữa các khối giá trị để bớt dính vào nhau */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
                        {values.map((v) => (
                            <div key={v.title} style={{ backgroundColor: 'white', padding: '40px 30px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(201, 168, 76, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                                    <v.icon size={32} color="#c9a84c" />
                                </div>
                                <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#1a1a2e', marginBottom: '12px' }}>{v.title}</h3>
                                <p style={{ color: '#8a8a9a', fontSize: '0.9rem', lineHeight: 1.6 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section style={{ padding: '120px 20px', backgroundColor: '#ffffff' }} id="team" aria-labelledby="team-heading">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <p style={{ color: '#c9a84c', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Con Người</p>
                        <h2 id="team-heading" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1a2e' }}>
                            Đội Ngũ Sáng Tạo
                        </h2>
                    </div>
                    {/* FIX 4: Tách các ảnh nhân sự ra xa nhau */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
                        {team.map((member) => (
                            <div key={member.name} style={{ textAlign: 'center' }}>
                                <div style={{ width: '160px', height: '160px', margin: '0 auto 20px auto', borderRadius: '50%', overflow: 'hidden', border: '6px solid #e8e4df' }}>
                                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '4px' }}>{member.name}</h3>
                                <p style={{ color: '#8a8a9a', fontSize: '0.9rem' }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}