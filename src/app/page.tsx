import BottomButton from '@/app/_components/bottom-button';
import EventDescription from '@/app/_components/event-description';
import Introduction from '@/app/_components/introduction';

const Home = () => {
  return (
    <div className='h-screen w-full'>
      <main
        id='main-content'
        aria-label='이동약자를 위한 AI 모델 만들기 이벤트 메인 페이지'
        className='flex flex-col items-center pb-32'
      >
        <Introduction />
        <EventDescription />
      </main>

      <BottomButton />
    </div>
  );
};

export default Home;
