'use client';

import ButtonList from '@/components/ui/button-list';
import useInteractionTimer from '@/hooks/use-interaction-timer';
import useUpdateLabel from '@/hooks/use-update-label';
import { TOTAL_LABELING_STEPS } from '@/lib/constants';
import { HasStep } from '@/types/api/label';

import { labelOption } from '../../types/label-option';
import { LabelStepProps } from '../../types/label-step';
import LabelStepLayout from '../label-step-layout';

const LABEL_STEP_1_OPTIONS: labelOption<HasStep>[] = [
  {
    title: '있어요',
    value: 'YES',
  },
  {
    title: '없어요',
    value: 'NO',
  },
  {
    title: '잘 모르겠어요',
    value: 'NOT_SURE',
  },
];

export const LabelStep1 = ({
  imageKey,
  currentLabelData,
  onNext,
  onUpdateCache,
}: LabelStepProps) => {
  const { endTimer } = useInteractionTimer();
  const { isPending, mutate } = useUpdateLabel({
    imageKey,
    onSuccess: onNext,
  });

  const selectedValue = currentLabelData?.has_step;

  const handleSelectItem = (value: HasStep) => {
    const interactionTime = endTimer() ?? 0;
    onUpdateCache({ has_step: value });
    mutate({
      has_step: value,
      step_label_finish_duration: interactionTime,
      finish_labeling: false,
    });
  };

  return (
    <LabelStepLayout
      title='계단 또는 턱이 있나요?'
      description='사진에 보이는 것만 선택해주세요'
      currentStep={1}
      totalSteps={TOTAL_LABELING_STEPS}
      imageKey={imageKey}
      labelingOptions={
        <ButtonList className='w-full'>
          {LABEL_STEP_1_OPTIONS.map(({ title, value }) => (
            <ButtonList.Item
              key={title}
              disabled={isPending}
              title={title}
              selected={selectedValue === value}
              onClick={() => handleSelectItem(value)}
            />
          ))}
        </ButtonList>
      }
    />
  );
};
