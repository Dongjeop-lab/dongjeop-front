import BottomButton from '@/app/_components/bottom-button';
import EventDescription from '@/app/_components/event-description';
import Introduction from '@/app/_components/introduction';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const resolvedParams = await searchParams;

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

      <BottomButton searchParams={resolvedParams} />
    </div>
  );
};

export default Home;
