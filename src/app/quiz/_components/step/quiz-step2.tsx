import { QuizStepProps } from '../../_types/quiz-step';

export const QuizStep2 = ({ onNext }: QuizStepProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <p>QuizStep2 개발 중 .. ⚒️</p>
      <button
        onClick={onNext}
        className='bg-primary rounded-2xl px-2 py-1 text-white'
      >
        다음 단계로
      </button>
    </div>
  );
};
