import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fasy - Amazon Relay Loadboard Auto Booker',
  description:
    'Best Relay Auto Booker for Amazon Relay loadboard. Fasty automatically books loads for you from loadboard.',
  keywords:
    'Auto booker, Relay, Load board, Auto Booker, Fasty, Fasty Auto Booker, Relay loadboard automatic, Relay loadboard bot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
