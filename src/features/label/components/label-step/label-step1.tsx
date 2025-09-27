'use client';

import { useState } from 'react';

import ButtonList from '@/components/ui/button-list';
import { TOTAL_LABELING_STEPS } from '@/lib/constants';

import { labelOption } from '../../types/label-option';
import { LabelStepProps } from '../../types/label-step';
import LabelStepLayout from '../label-step-layout';

const LABEL_STEP_1_OPTIONS: labelOption[] = [
  {
    title: '있어요',
    value: 'yes',
  },
  {
    title: '없어요',
    value: 'no',
  },
  {
    title: '잘 모르겠어요',
    value: 'not_sure',
  },
];

export const LabelStep1 = ({}: LabelStepProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <LabelStepLayout
      title='계단 또는 턱이 있나요?'
      description='사진에 보이는 것만 선택해주세요'
      currentStep={1}
      totalSteps={TOTAL_LABELING_STEPS}
      imageKey='/images/dummy-label-image.png'
      labelingOptions={
        <ButtonList className='w-full'>
          {LABEL_STEP_1_OPTIONS.map(({ title, value }) => (
            <ButtonList.Item
              key={title}
              title={title}
              selected={selectedValue === value}
              onClick={() => setSelectedValue(value)}
            />
          ))}
        </ButtonList>
      }
    />
  );
};
