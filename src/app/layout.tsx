import './globals.css';

import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';

import TanstackQueryProvider from '@/contexts/tanstack-query-provider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className} text-16-regular`}>
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
