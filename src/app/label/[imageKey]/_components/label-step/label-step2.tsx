'use client';

import { useMemo } from 'react';

import BottomCTA from '@/components/ui/bottom-cta';
import ButtonList from '@/components/ui/button-list';
import useInteractionTimer from '@/hooks/use-interaction-timer';
import useUpdateLabel from '@/hooks/use-update-label';
import { TOTAL_LABELING_STEPS } from '@/lib/constants';
import {
  GetLabelStatusResponse,
  UpdateLabelRequestBody,
} from '@/types/api/label';

import { labelOption } from '../../_types/label-option';
import { LabelStepProps } from '../../_types/label-step';
import LabelStepLayout from '../label-step-layout';

type LabelStep2OptionValue =
  | keyof Pick<
      UpdateLabelRequestBody,
      | 'has_movable_chair'
      | 'has_high_chair'
      | 'has_floor_chair'
      | 'has_fixed_chair'
    >
  | 'not_sure';

const NOT_SURE_VALUE = 'not_sure';

const LABEL_STEP_2_OPTIONS: labelOption<LabelStep2OptionValue>[] = [
  { title: '낮은 이동식 의자', value: 'has_movable_chair' },
  { title: '높은 이동식 의자', value: 'has_high_chair' },
  { title: '좌식 의자', value: 'has_floor_chair' },
  { title: '고정식 의자', value: 'has_fixed_chair' },
  { title: '잘 모르겠어요', value: NOT_SURE_VALUE },
];

export const LabelStep2 = ({
  imageKey,
  currentLabelData,
  onNext,
  onUpdateCache,
}: LabelStepProps) => {
  const { endTimer } = useInteractionTimer();
  const { isPending, mutate } = useUpdateLabel({ imageKey, onSuccess: onNext });

  const selectedValue = useMemo(() => {
    if (!currentLabelData) return [];
    if (currentLabelData.is_not_sure_chair) return [NOT_SURE_VALUE];

    return LABEL_STEP_2_OPTIONS.map(opt => opt.value).filter(
      value =>
        value !== NOT_SURE_VALUE &&
        currentLabelData[value as keyof GetLabelStatusResponse]
    );
  }, [currentLabelData]);

  const handleSelect = (value: LabelStep2OptionValue) => {
    let newCacheData: Partial<GetLabelStatusResponse> = {};

    if (value === NOT_SURE_VALUE) {
      newCacheData = {
        has_movable_chair: false,
        has_high_chair: false,
        has_floor_chair: false,
        has_fixed_chair: false,
        is_not_sure_chair: true,
      };
    } else {
      const key = value as keyof GetLabelStatusResponse;
      newCacheData = {
        ...currentLabelData,
        [key]: !currentLabelData?.[key],
        is_not_sure_chair: false,
      };
    }

    onUpdateCache(newCacheData);
  };

  const handleSubmitValue = () => {
    const interactionTime = endTimer() ?? 0;
    const updateValeus: Omit<UpdateLabelRequestBody, 'finish_labeling'> =
      selectedValue.includes(NOT_SURE_VALUE)
        ? { is_not_sure_chair: true }
        : selectedValue.reduce(
            (acc, value) => {
              return { ...acc, [value]: true };
            },
            {} as Omit<UpdateLabelRequestBody, 'finish_labeling'>
          );
    mutate({
      ...updateValeus,
      chair_label_finish_duration: interactionTime,
      finish_labeling: false,
    });
  };

  return (
    <>
      <LabelStepLayout
        title='어떤 의자가 있는지 알려주세요'
        description={`사진에 보이는 의자에 대해\n모두 선택해주세요`}
        currentStep={2}
        totalSteps={TOTAL_LABELING_STEPS}
        imageKey={imageKey}
        className='pb-20'
        labelingOptions={
          <ButtonList className='w-full'>
            {LABEL_STEP_2_OPTIONS.map(({ title, value }) => (
              <ButtonList.Item
                key={title}
                disabled={isPending}
                title={title}
                selected={selectedValue.includes(value)}
                onClick={() => handleSelect(value)}
              />
            ))}
          </ButtonList>
        }
      />
      <BottomCTA hasAnimation>
        <BottomCTA.Button
          disabled={selectedValue.length === 0 || isPending}
          variant='primary'
          onClick={handleSubmitValue}
        >
          다음
        </BottomCTA.Button>
      </BottomCTA>
    </>
  );
};
