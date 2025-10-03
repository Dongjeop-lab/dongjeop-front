import BottomButton from '@/app/_components/BottomButton';
import EventDescription from '@/app/_components/EventDescription';
import Introduction from '@/app/_components/introduction';

const Home = () => {
  return (
    <div className='h-screen w-full'>
      <main className='flex flex-col items-center pb-32'>
        <Introduction />
        <EventDescription />
      </main>

      <BottomButton />
    </div>
  );
};

export default Home;
