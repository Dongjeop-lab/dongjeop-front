'use client';

import { useState } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import ButtonList from '@/components/ui/button-list';
import Header from '@/components/ui/header';
import { TOTAL_LABELING_STEPS } from '@/lib/constants';

import { labelOption } from '../../types/label-option';
import LabelStepLayout from '../label-step-layout';

const LABEL_STEP_2_OPTIONS: labelOption[] = [
  { title: '낮은 이동식 의자', value: 'low_movable_chair' },
  { title: '높은 이동식 의자', value: 'high_movable_chair' },
  { title: '좌식 의자', value: 'floor_chair' },
  { title: '고정식 의자', value: 'fixed_chair' },
  { title: '잘 모르겠어요', value: 'not_sure' },
];

export const LabelStep2 = () => {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (selectedValue.includes(value)) {
      setSelectedValue(prev => prev.filter(v => v !== value));
      return;
    }

    if (value === 'not_sure') {
      setSelectedValue(['not_sure']);
      return;
    }

    setSelectedValue(prev => [...prev, value]);
  };

  return (
    <>
      <Header onBack={() => null} />
      <LabelStepLayout
        title='어떤 의자가 있는지 알려주세요'
        description={`사진에 보이는 의자에 대해\n모두 선택해주세요`}
        currentStep={2}
        totalSteps={TOTAL_LABELING_STEPS}
        imageKey='/images/dummy-label-image.png'
        className='pb-20'
        labelingOptions={
          <ButtonList className='w-full'>
            {LABEL_STEP_2_OPTIONS.map(({ title, value }) => (
              <ButtonList.Item
                key={title}
                title={title}
                selected={selectedValue.includes(value)}
                onClick={() => handleSelect(value)}
              />
            ))}
          </ButtonList>
        }
      />
      <BottomCTA>
        <BottomCTA.Button
          disabled={selectedValue.length === 0}
          variant='primary'
        >
          다음
        </BottomCTA.Button>
      </BottomCTA>
    </>
  );
};
