import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Áo Xưa Nay | Khám phá & Phối đồ Việt Phục - Hàng rào Văn hóa AI',
  description: 'Nền tảng khám phá và phối đồ Việt phục truyền thống qua 4 thời kỳ lịch sử kết hợp Hàng rào văn hóa và AI Stylist Gen Z.',
  openGraph: {
    title: 'Áo Xưa Nay | Khám phá & Phối đồ Việt Phục - Hàng rào Văn hóa AI',
    description: 'Nền tảng khám phá và phối đồ Việt phục truyền thống qua 4 thời kỳ lịch sử kết hợp Hàng rào văn hóa và AI Stylist Gen Z.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Áo Xưa Nay | Khám phá & Phối đồ Việt Phục - Hàng rào Văn hóa AI',
    description: 'Nền tảng khám phá và phối đồ Việt phục truyền thống qua 4 thời kỳ lịch sử kết hợp Hàng rào văn hóa và AI Stylist Gen Z.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="min-h-screen bg-[#FDFBF7] text-[#1C1917] antialiased selection:bg-[#991B1B]/15 selection:text-[#991B1B]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
