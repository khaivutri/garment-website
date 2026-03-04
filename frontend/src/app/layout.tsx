import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'VẢI VIỆT Fashion House | Thời Trang Việt Nam Cao Cấp',
    template: '%s | VẢI VIỆT Fashion House',
  },
  description:
    'VẢI VIỆT – Thương hiệu thời trang Việt Nam với thiết kế hiện đại, chất liệu cao cấp. Khám phá bộ sưu tập áo, quần, váy đầm và phụ kiện thời thượng.',
  keywords: ['thời trang việt nam', 'may mặc cao cấp', 'vải việt', 'fashion'],
  authors: [{ name: 'VẢI VIỆT Fashion House' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'VẢI VIỆT Fashion House',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <Header />
          <main className="flex-1 pt-[72px]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
