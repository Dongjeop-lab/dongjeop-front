import { Suspense } from 'react';

import BottomButton from '@/app/_components/bottom-button';
import EventDescription from '@/app/_components/event-description';
import Footer from '@/app/_components/footer';
import Introduction from '@/app/_components/introduction';
import ProjectDescription from '@/app/_components/project-description';

const Home = () => {
  return (
    <div className='h-screen w-full'>
      <main
        id='main-content'
        aria-label='이동약자를 위한 AI 모델 만들기 이벤트 메인 페이지'
        className='flex flex-col items-center pb-30'
      >
        <Introduction />
        <ProjectDescription />
        <EventDescription />
        <Footer />
        <div className='h-10 w-full bg-[#EBEBEB80]' />
      </main>

      <Suspense fallback={<></>}>
        <BottomButton />
      </Suspense>
    </div>
  );
};

export default Home;
