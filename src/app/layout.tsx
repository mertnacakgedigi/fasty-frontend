import './globals.css';
import { Inter } from 'next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fasty - Amazon Relay Loadboard Auto Booker',
  description:
    'Best Relay Auto Booker for Amazon Relay loadboard. Fasty automatically books loads for you from loadboard.',
  keywords:
    'Auto booker, amazon relay bot, Relay, Load board, Auto Booker, Fasty, Fasty Auto Booker, Relay loadboard automatic, Relay loadboard bot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <GoogleAnalytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
