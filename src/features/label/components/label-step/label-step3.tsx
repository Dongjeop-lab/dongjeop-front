'use client';

import { useState } from 'react';

import ButtonList from '@/components/ui/button-list';
import useInteractionTimer from '@/hooks/use-interaction-timer';
import useUpdateLabel from '@/hooks/use-update-label';
import { TOTAL_LABELING_STEPS } from '@/lib/constants';
import { WidthClass } from '@/types/api/label';

import { labelOption } from '../../types/label-option';
import { LabelStepProps } from '../../types/label-step';
import LabelStepLayout from '../label-step-layout';

const LABEL_STEP_3_OPTIONS: labelOption<WidthClass>[] = [
  {
    title: '좁아요',
    subtitle: '2명이 동시에 지나갈 수 있어요',
    value: 'narrow',
  },
  {
    title: '보통이에요',
    subtitle: '3명이 동시에 지나갈 수 있어요',
    value: 'normal',
  },
  {
    title: '넓어요',
    subtitle: '4명이 동시에 지나갈 수 있어요',
    value: 'wide',
  },
  {
    title: '휠체어 진입 불가',
    value: 'impossible',
  },
  {
    title: '잘 모르겠어요',
    value: 'not_sure',
  },
];

export const LabelStep3 = ({ imageKey, onNext }: LabelStepProps) => {
  const [selectedValue, setSelectedValue] = useState<WidthClass | null>(null);
  const { endTimer } = useInteractionTimer();
  const { mutate } = useUpdateLabel({ imageKey, onSuccess: onNext });

  const handleSelectItem = (value: WidthClass) => {
    setSelectedValue(value);
    const interactionTime = endTimer() ?? 0;
    mutate({
      width_class: value,
      width_label_finish_duration: interactionTime,
      finish_labeling: true,
    });
  };

  return (
    <LabelStepLayout
      title='통로 폭을 알려주세요'
      description={`통로가 많다면 가장 많이 보이는\n폭을 선택해주세요`}
      currentStep={3}
      totalSteps={TOTAL_LABELING_STEPS}
      imageKey='/images/dummy-label-image.png'
      labelingOptions={
        <ButtonList className='w-full'>
          {LABEL_STEP_3_OPTIONS.map(({ title, subtitle, value }) => (
            <ButtonList.Item
              key={title}
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
