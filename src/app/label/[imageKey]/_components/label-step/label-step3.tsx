'use client';

import useInteractionTimer from '@/app/label/[imageKey]/_hooks/use-interaction-timer';
import useUpdateLabel from '@/app/label/[imageKey]/_hooks/use-update-label';
import ButtonList from '@/components/ui/button-list';
import { TOTAL_LABELING_STEPS } from '@/lib/constants';
import { WidthClass } from '@/types/api/label';

import { labelOption } from '../../_types/label-option';
import { LabelStepProps } from '../../_types/label-step';
import LabelStepLayout from '../label-step-layout';

const LABEL_STEP_3_OPTIONS: labelOption<WidthClass>[] = [
  {
    title: '좁아요',
    subtitle: '2명이 동시에 지나갈 수 있어요',
    value: 'NARROW',
  },
  {
    title: '보통이에요',
    subtitle: '3명이 동시에 지나갈 수 있어요',
    value: 'NORMAL',
  },
  {
    title: '넓어요',
    subtitle: '4명이 동시에 지나갈 수 있어요',
    value: 'WIDE',
  },
  {
    title: '휠체어 진입 불가',
    value: 'IMPOSSIBLE',
  },
  {
    title: '잘 모르겠어요',
    value: 'NOT_SURE',
  },
];

export const LabelStep3 = ({
  imageKey,
  currentLabelData,
  onNext,
  onUpdateCache,
}: LabelStepProps) => {
  const { endTimer } = useInteractionTimer();
  const { isPending, mutate } = useUpdateLabel({ imageKey, onSuccess: onNext });

  const selectedValue = currentLabelData?.width_class;

  const handleSelectItem = (value: WidthClass) => {
    const interactionTime = endTimer() ?? 0;
    onUpdateCache({
      width_class: value,
    });
    mutate({
      width_class: value,
      width_label_finish_duration: interactionTime,
      finish_labeling: true,
    });
  };

  return (
    <LabelStepLayout
      title='통로 폭을 알려주세요'
      description={`통로가 많다면 가장 많이 보이는\n폭을 선택해 주세요`}
      currentStep={3}
      totalSteps={TOTAL_LABELING_STEPS}
      imageKey={imageKey}
      labelingOptions={
        <ButtonList className='w-full'>
          {LABEL_STEP_3_OPTIONS.map(({ title, subtitle, value }) => (
            <ButtonList.Item
              key={title}
              disabled={isPending}
              title={title}
              subTitle={subtitle}
              selected={selectedValue === value}
              onClick={() => handleSelectItem(value)}
            />
          ))}
        </ButtonList>
      }
    />
  );
};
