export interface QuizStepProps {
  isCorrect: boolean | null;
  onNext: () => void;
  onAnswer: (isCorrect: boolean) => void;
}
