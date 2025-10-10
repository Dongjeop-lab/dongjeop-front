'use client';

import EventDescription from '@/app/_components/event-description';

import EventFormSection from '../event-form-section';

interface EventStepProps {
  imageKey: string;
}

export const EventStep = ({ imageKey }: EventStepProps) => {
  return (
    <main className='mb-20'>
      <h1 className='mb-8 flex flex-col items-center gap-3'>
        <span className='text-18-semibold text-primary'>EVENT</span>
        <span className='text-26-bold text-center'>
          마지막으로 이벤트 참여를 위한
          <br />
          정보를 입력해주세요
        </span>
      </h1>
      <EventFormSection imageKey={imageKey} />
      <EventDescription />
    </main>
  );
};
