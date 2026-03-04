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
        <div>
            {/* Hero */}
            <section
                className="relative py-32 flex items-center overflow-hidden"
                style={{ background: 'var(--gradient-hero)' }}
                aria-label="About hero"
            >
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
                        alt=""
                        className="w-full h-full object-cover opacity-10"
                    />
                </div>
                <div className="section-container relative z-10 text-center">
                    <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4">Về Chúng Tôi</p>
                    <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                        Chúng Tôi Là{' '}
                        <span className="text-gradient-gold">VẢI VIỆT</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Thương hiệu thời trang Việt Nam ra đời từ tình yêu với văn hóa dân tộc và khát vọng
                        mang vẻ đẹp Việt ra thế giới.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-24 bg-white" id="story" aria-labelledby="story-heading">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3">Câu Chuyện</p>
                            <h2 id="story-heading" className="font-display text-4xl font-bold text-[#1a1a2e] mb-6 leading-tight">
                                Từ Làng Nghề Đến Sàn Diễn Quốc Tế
                            </h2>
                            <p className="text-[#5a5a6a] leading-relaxed mb-4">
                                VẢI VIỆT được thành lập năm 2018 bởi nhà thiết kế Nguyễn Thị Mai — người có hơn 15 năm
                                kinh nghiệm trong ngành thời trang quốc tế. Với tầm nhìn là tôn vinh di sản dệt may Việt Nam,
                                bà đã quy tụ những nghệ nhân tài hoa từ khắp mọi miền đất nước.
                            </p>
                            <p className="text-[#5a5a6a] leading-relaxed mb-8">
                                Ngày nay, VẢI VIỆT có mặt tại hơn 10 thành phố và xuất khẩu sang 5 quốc gia,
                                mang thời trang thuần Việt đến với người yêu thời trang toàn cầu.
                            </p>
                            <Link href="/products" id="about-shop-btn" className="btn btn-primary text-[#1a1a2e] !py-3.5">
                                Khám Phá Bộ Sưu Tập
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1594938298603-c8148c4b4de2?w=400&q=80" alt="Workshop" className="rounded-2xl object-cover h-56 w-full" />
                            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" alt="Fabric" className="rounded-2xl object-cover h-56 w-full mt-6" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-[#fdfaf5]" id="values" aria-labelledby="values-heading">
                <div className="section-container">
                    <div className="text-center mb-14">
                        <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-2">Triết Lý</p>
                        <h2 id="values-heading" className="font-display text-4xl font-bold text-[#1a1a2e]">
                            Giá Trị Cốt Lõi
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <div
                                key={v.title}
                                className="card p-7 text-center animate-fade-in-up"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-4">
                                    <v.icon size={26} className="text-[#c9a84c]" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-[#1a1a2e] mb-2">{v.title}</h3>
                                <p className="text-[#8a8a9a] text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-white" id="team" aria-labelledby="team-heading">
                <div className="section-container">
                    <div className="text-center mb-14">
                        <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-2">Con Người</p>
                        <h2 id="team-heading" className="font-display text-4xl font-bold text-[#1a1a2e]">
                            Đội Ngũ Sáng Tạo
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        {team.map((member) => (
                            <div key={member.name} className="text-center group">
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#e8e4df]
                  group-hover:border-[#c9a84c] transition-colors shadow-md">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h3 className="font-display font-bold text-[#1a1a2e]">{member.name}</h3>
                                <p className="text-[#8a8a9a] text-sm mt-0.5">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
