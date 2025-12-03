import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kancher.Tv - Интерактивное портфолио',
  description: 'Персональное интерактивное портфолио Сергея Канчера - медиа-профессионала с 15+ летним опытом',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}