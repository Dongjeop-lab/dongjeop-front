import Image from 'next/image';
import Link from 'next/link';

import { BROWSER_PATH } from '@/lib/path';

const Footer = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center bg-[#EBEBEB80] px-5 py-10'>
      <footer className='flex flex-col items-center gap-6'>
        <Image
          src='/images/home/footer-logo.svg'
          alt='Kakao, 계단뿌셔클럽, Tech For Impact'
          width={188}
          height={15}
        />

        <p className='text-center text-xs leading-4 opacity-50'>
          본 서비스는 카카오임팩트와 계단뿌셔클럽의 지원,
          <br />
          테크포임팩트 커뮤니티의 기여로 개발되었습니다.
        </p>

        <div className='h-px w-full bg-[#D2D2D2]' />

        <div className='flex items-center gap-6 text-xs leading-4 font-normal tracking-normal text-[#767676]'>
          <Link
            href={BROWSER_PATH.TERMS.SERVICE}
            className='underline'
          >
            서비스 이용약관
          </Link>
          <Link
            href={BROWSER_PATH.TERMS.PRIVACY_POLICY}
            className='underline'
          >
            개인정보 처리방침
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
