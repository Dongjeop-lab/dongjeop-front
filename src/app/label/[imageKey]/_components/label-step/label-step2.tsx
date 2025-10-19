'use client';

import { useMemo } from 'react';

import useInteractionTimer from '@/app/label/[imageKey]/_hooks/use-interaction-timer';
import useUpdateLabel from '@/app/label/[imageKey]/_hooks/use-update-label';
import BottomCTA from '@/components/ui/bottom-cta';
import ButtonList from '@/components/ui/button-list';
import { TOTAL_LABELING_STEPS } from '@/lib/constants';
import {
  GetLabelStatusResponse,
  UpdateLabelRequestBody,
} from '@/types/api/label';

import { labelOption } from '../../_types/label-option';
import { LabelStepProps } from '../../_types/label-step';
import LabelStepLayout from '../label-step-layout';

type LabelStep2OptionWithoutNotsure = keyof Pick<
  UpdateLabelRequestBody,
  'has_movable_chair' | 'has_high_chair' | 'has_floor_chair' | 'has_fixed_chair'
>;

type LabelStep2OptionValue = LabelStep2OptionWithoutNotsure | 'not_sure';

const NOT_SURE_VALUE = 'not_sure';

const ALL_CHAIR_KEYS: LabelStep2OptionWithoutNotsure[] = [
  'has_fixed_chair',
  'has_floor_chair',
  'has_high_chair',
  'has_movable_chair',
];

const LABEL_STEP_2_OPTIONS: labelOption<LabelStep2OptionValue>[] = [
  {
    title: '일반 의자',
    subtitle: '이동이 가능한, 일반적인 높이의 의자',
    value: 'has_movable_chair',
  },
  {
    title: '높은 의자',
    subtitle: '주로 높은 바 테이블과 사용되는 의자',
    value: 'has_high_chair',
  },
  {
    title: '좌식',
    subtitle: '바닥에 앉는 형태의 의자 또는 방석',
    value: 'has_floor_chair',
  },
  {
    title: '붙박이/소파 의자',
    subtitle: '밀어도 움직이지 않는 의자',
    value: 'has_fixed_chair',
  },
  { title: '잘 모르겠어요', subtitle: '', value: NOT_SURE_VALUE },
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

    let updateValeus: Omit<UpdateLabelRequestBody, 'finish_labeling'>;

    if (selectedValue.includes(NOT_SURE_VALUE)) {
      updateValeus = {
        has_movable_chair: false,
        has_high_chair: false,
        has_floor_chair: false,
        has_fixed_chair: false,
        is_not_sure_chair: true,
      };
    } else {
      updateValeus = ALL_CHAIR_KEYS.reduce(
        (acc, key) => {
          acc[key] = selectedValue.includes(key);
          return acc;
        },
        {} as Omit<UpdateLabelRequestBody, 'finish_labeling'>
      );

      updateValeus.is_not_sure_chair = false;
    }
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
        description={`사진에 보이는 의자에 대해\n모두 선택해 주세요`}
        currentStep={2}
        totalSteps={TOTAL_LABELING_STEPS}
        imageKey={imageKey}
        className='pb-20'
        labelingOptions={
          <ButtonList className='w-full'>
            {LABEL_STEP_2_OPTIONS.map(({ title, subtitle, value }) => (
              <ButtonList.Item
                key={title}
                disabled={isPending}
                title={title}
                subTitle={subtitle}
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
