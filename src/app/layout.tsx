import './globals.css';

import { Metadata } from 'next';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';

import TanstackQueryProvider from '@/contexts/tanstack-query-provider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: '동접 - 이동약자를 위한 AI 모델 만들기',
  description: '실내 사진을 업로드하면 이동약자의 접근성 향상에 도움이 돼요.',
  metadataBase: new URL('https://dongjeop.com'),
  openGraph: {
    title: '퀴즈 풀고 선물 받아가세요!',
    description: '실내 사진을 업로드하면 이동약자의 접근성 향상에 도움이 돼요.',
    images: [
      {
        url: '/images/og/og-img.png',
        width: 1200,
        height: 630,
        alt: '퀴즈 풀고 선물 받아가세요! - 동접',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${pretendard.className} text-16-regular mx-auto max-w-[768px]`}
      >
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar
          theme='colored'
        />
      </body>
    </html>
  );
}
