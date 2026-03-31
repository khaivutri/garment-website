import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Award,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trang Chủ',
};

const featuredCategories = [
  {
    id: 1,
    name: 'Áo',
    description: 'Áo sơ mi, áo dài, áo kiếm',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4de2?w=600&q=80',
    href: '/products?category=1',
  },
  {
    id: 2,
    name: 'Quần',
    description: 'Quần tây, quần jeans, quần vải',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    href: '/products?category=2',
  },
  {
    id: 3,
    name: 'Váy & Đầm',
    description: 'Thiết kế tinh tế, nhẹ nhàng',
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80',
    href: '/products?category=3',
  },
  {
    id: 4,
    name: 'Phụ Kiện',
    description: 'Hoàn thiện phong cách',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80',
    href: '/products?category=4',
  },
];

const features = [
  { icon: Truck, title: 'Miễn Phí Vận Chuyển', desc: 'Đơn hàng trên 500.000đ' },
  { icon: Shield, title: 'Thanh Toán An Toàn', desc: 'Bảo mật 100% thông tin' },
  { icon: RefreshCw, title: 'Đổi Trả 30 Ngày', desc: 'Không hài lòng hoàn tiền' },
  { icon: Award, title: 'Hàng Chính Hãng', desc: 'Cam kết chất lượng cao cấp' },
];

const testimonials = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Khách hàng thân thiết',
    avatar: 'N',
    content:
      'Chất lượng vải rất tốt, đường may tỉ mỉ. Mình đã mua nhiều lần và không bao giờ thất vọng!',
    rating: 5,
  },
  {
    name: 'Trần Hương Giang',
    role: 'Fashion Blogger',
    avatar: 'T',
    content:
      'VẢI VIỆT có những thiết kế rất độc đáo, mang đậm bản sắc Việt mà vẫn hiện đại. Rất đáng mua!',
    rating: 5,
  },
  {
    name: 'Lê Thành Nam',
    role: 'Doanh nhân',
    avatar: 'L',
    content:
      'Tôi tin tưởng VẢI VIỆT cho trang phục công sở. Chất lượng xứng đáng với mức giá.',
    rating: 4,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center -mt-[72px] overflow-hidden"
        style={{ background: 'var(--gradient-hero)' }}
        aria-label="Hero section"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full
            bg-[#c9a84c]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full
            bg-[#c9a84c]/08 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[120%] h-px bg-white/5" />
        </div>

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/60 via-[#1a1a2e]/80 to-[#1a1a2e]" />
        </div>

        <div className="section-container relative z-10 text-center py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-[#c9a84c]/15 border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-medium mb-8
            animate-fade-in">
            <Star size={13} fill="currentColor" />
            Bộ Sưu Tập Xuân Hè 2026
          </div>

          <h1
              style={{ marginBottom: '40px' }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tight animate-fade-in-up"
          >
            Thời Trang{' '}
            <span className="text-gradient-gold">Thuần Việt</span>
            <br />
            <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium italic">
    Đẳng Cấp Quốc Tế
  </span>
          </h1>

          <p
              style={{ marginBottom: '56px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
              className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up animation-delay-200"
          >
            Khám phá những thiết kế tinh tế mang đậm bản sắc văn hóa Việt Nam,
            được làm từ chất liệu cao cấp bởi những nghệ nhân tài hoa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
            <Link
              href="/products"
              id="hero-shop-btn"
              className="btn btn-primary text-[#1a1a2e] !py-4 !px-10 !text-base !rounded-2xl"
            >
              Khám Phá Ngay
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              id="hero-about-btn"
              className="btn text-white border border-white/30 hover:bg-white/10 !py-4 !px-10 !text-base !rounded-2xl"
            >
              Về Chúng Tôi
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 max-w-3xl mx-auto mt-32
          animate-fade-in-up animation-delay-400">
            {[
              { value: '500+', label: 'Sản phẩm' },
              { value: '10K+', label: 'Khách hàng' },
              { value: '98%', label: 'Hài lòng' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-white/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="bg-white border-y border-[#e8e4df]" aria-label="Tính năng">
        <div className="section-container py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#f8f4ef] flex items-center justify-center
                  flex-shrink-0 group-hover:bg-[#c9a84c]/15 transition-colors">
                  <Icon size={22} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] text-sm">{title}</p>
                  <p className="text-[#8a8a9a] text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px' }} className="bg-[#fdfaf5]" aria-labelledby="categories-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-2">
              Khám Phá
            </p>
            <h2 id="categories-heading" className="font-display text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
              Danh Mục Sản Phẩm
            </h2>
            <p
                className="text-[#8a8a9a] mt-3 max-w-xl mx-auto"
                style={{ textAlign: 'center', margin: '12px auto 0' }}
            >
              Tìm kiếm phong cách của bạn trong bộ sưu tập đa dạng từ trang phục công sở đến casual
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCategories.map((cat, i) => (
              <Link
                key={cat.id}
                href={cat.href}
                id={`category-link-${cat.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] block
                  animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700
                    group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-wider mb-1">
                    {cat.description}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#e8c97a]
                    transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/70 text-sm mt-2
                    translate-x-0 group-hover:translate-x-1 transition-transform">
                    Xem ngay <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px' }} className="bg-white" aria-labelledby="featured-heading">
        <div className="section-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-2">
                Nổi Bật
              </p>
              <h2 id="featured-heading" className="font-display text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
                Sản Phẩm Được Yêu Thích
              </h2>
            </div>
            <Link
              href="/products"
              id="view-all-products-btn"
              className="hidden sm:flex items-center gap-1.5 text-[#c9a84c] font-semibold text-sm
                hover:gap-3 transition-all group"
            >
              Xem Tất Cả
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Placeholder product cards (real data loaded on products page) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              {
                id: 101,
                name: 'Áo Dài Cách Tân Hoa Sen',
                material: 'Lụa Tơ Tằm',
                price: 1850000,
                cat: 'Áo Dài',
                img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
              },
              {
                id: 102,
                name: 'Bộ Vest Công Sở Cao Cấp',
                material: 'Len Cashmere',
                price: 2450000,
                cat: 'Vest',
                img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4de2?w=600&q=80',
              },
              {
                id: 103,
                name: 'Váy Midi Thổ Cẩm',
                material: 'Thổ Cẩm Thủ Công',
                price: 1250000,
                cat: 'Váy',
                img: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80',
              },
              {
                id: 104,
                name: 'Quần Tây Slim Fit',
                material: 'Vải Bamboo',
                price: 950000,
                cat: 'Quần',
                img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
              },
            ].map((item, i) => (
              <Link
                key={item.id}
                href="/products"
                id={`featured-product-${item.id}`}
                className="group card overflow-hidden animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f4ef]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge bg-[#c9a84c]/10 text-[#996f1c] border border-[#c9a84c]/30 text-[10px] uppercase tracking-wider">
                      {item.cat}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-[#1a1a2e] text-sm leading-snug
                    group-hover:text-[#c9a84c] transition-colors line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#8a8a9a] mb-3">Chất liệu: {item.material}</p>
                  <p className="font-display font-bold text-lg text-[#c9a84c]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/products" id="mobile-view-all-btn" className="btn btn-outline">
              Xem Tất Cả Sản Phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND STORY SECTION */}
      <section className="py-24" aria-labelledby="story-heading"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4">
                Câu Chuyện Thương Hiệu
              </p>
              <h2 id="story-heading" className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Giao Thoa Giữa
                <br />
                <span className="text-gradient-gold">Truyền Thống & Hiện Đại</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                VẢI VIỆT ra đời từ tình yêu với văn hóa và thổ cẩm Việt Nam. Chúng tôi tin rằng
                thời trang không chỉ là quần áo — đó là câu chuyện về con người, đất nước và bản sắc.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Mỗi sản phẩm đều được chế tác thủ công bởi các nghệ nhân tài hoa, sử dụng chất liệu
                được lựa chọn kỹ lưỡng từ các làng nghề truyền thống.
              </p>
              <Link
                  href="/about"
                  id="story-about-btn"
                  className="btn btn-primary text-[#1a1a2e] !py-3.5"
                  style={{ marginTop: '32px', display: 'inline-flex' }}
              >
                Tìm Hiểu Thêm
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
                'https://images.unsplash.com/photo-1594938298603-c8148c4b4de2?w=400&q=80',
                'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400&q=80',
                'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80',
              ].map((src, i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden ${i === 1 ? 'mt-6' : ''} ${i === 3 ? '-mt-6' : ''}`}
                >
                  <img
                    src={src}
                    alt={`Brand story ${i + 1}`}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px' }} className="bg-[#fdfaf5]" aria-labelledby="testimonials-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-2">
              Đánh Giá
            </p>
            <h2 id="testimonials-heading" className="font-display text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
              Khách Hàng Nói Gì
            </h2>
          </div>

          <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'center',
                marginTop: '64px' /* Thêm dòng này để đẩy 3 thẻ cách xa tiêu đề */
              }}
          >
            {testimonials.map((t, i) => (
                <div
                    key={t.name}
                    className="card p-7 animate-fade-in-up"
                    style={{
                      animationDelay: `${i * 150}ms`,
                      flex: '1 1 30%',
                      minWidth: '280px'
                    }}
                >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={16} fill="#c9a84c" className="text-[#c9a84c]" />
                  ))}
                  {Array.from({ length: 5 - t.rating }).map((_, si) => (
                    <Star key={si} size={16} className="text-[#e8e4df]" />
                  ))}
                </div>

                <p className="text-[#5a5a6a] text-sm leading-relaxed mb-6 italic">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c97a]
                    flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[#1a1a2e] text-sm">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a1a2e] text-sm">{t.name}</p>
                    <p className="text-[#8a8a9a] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px' }} className="bg-white" aria-label="Call to action">
        <div className="section-container">
          <div className="rounded-3xl overflow-hidden relative"
            style={{ background: 'var(--gradient-gold)' }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-12">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-2">
                  Sẵn Sàng Nâng Tầm Phong Cách?
                </h2>
                <p className="text-[#1a1a2e]/70">
                  Đăng ký ngay để nhận ưu đãi độc quyền dành cho thành viên mới
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Link href="/products" id="cta-shop-btn"
                  className="btn btn-dark !py-3.5 !px-8">
                  Mua Sắm Ngay
                </Link>
                <Link href="/login" id="cta-login-btn"
                  className="btn bg-white text-[#1a1a2e] hover:-translate-y-0.5 transition-all !py-3.5 !px-8 shadow-md">
                  Tạo Tài Khoản
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
