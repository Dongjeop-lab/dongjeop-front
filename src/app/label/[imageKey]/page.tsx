'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'motion/react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { apiClient } from '@/app/api/client';
import Header from '@/components/ui/header';
import { STEP_NUMBER } from '@/lib/constants';
import { sendGAEvent } from '@/lib/ga';
import { API_PATH, BROWSER_PATH } from '@/lib/path';
import { queryKeys } from '@/lib/query-key';
import { GetLabelStatusResponse } from '@/types/api/label';

import {
  EventStep,
  LabelStep1,
  LabelStep2,
  LabelStep3,
} from './_components/label-step';

const LabelPage = () => {
  const [isRoutingFinished, setIsRoutingFinished] = useState(false);
  const router = useRouter();
  const params = useParams<{ imageKey: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasInitialRoutingRan = useRef(false);
  const queryClient = useQueryClient();

  const { data, isError, isSuccess } = useQuery({
    queryKey: queryKeys.label.imageKey(params.imageKey),
    queryFn: () =>
      apiClient.get<GetLabelStatusResponse>(
        `${API_PATH.LABEL}/${params.imageKey}`
      ),
  });

  const stepParam = Number.parseInt(searchParams.get('step') ?? '', 10);
  const currentStep = Number.isFinite(stepParam)
    ? Math.min(Math.max(stepParam, STEP_NUMBER.STEP1), STEP_NUMBER.STEP3)
    : STEP_NUMBER.STEP1;

  const handleNextStep = () => {
    if (currentStep === STEP_NUMBER.STEP3) {
      router.push(BROWSER_PATH.LABEL.FINISH(params.imageKey));
      return;
    }

    const nextStep = Math.min(currentStep + 1, STEP_NUMBER.STEP3);
    router.push(`${pathname}?step=${nextStep}`);
  };

  const handleBack = () => {
    if (currentStep === STEP_NUMBER.STEP1) {
      router.push(BROWSER_PATH.LABEL.UPLOAD);
      return;
    }

    const prevStep = currentStep - 1;
    router.push(`${pathname}?step=${prevStep}`);
  };

  const handleUpdateLabelCache = (newData: Partial<GetLabelStatusResponse>) => {
    queryClient.setQueryData<{
      success: boolean;
      data: GetLabelStatusResponse;
    }>(queryKeys.label.imageKey(params.imageKey), oldData => {
      if (!oldData) return;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          ...newData,
        },
      };
    });
  };

  useEffect(() => {
    const getPausedStep = (data: GetLabelStatusResponse) => {
      const {
        has_fixed_chair,
        has_floor_chair,
        has_high_chair,
        has_movable_chair,
        is_not_sure_chair,
      } = data;

      const step2 = [
        has_fixed_chair,
        has_floor_chair,
        has_high_chair,
        has_movable_chair,
        is_not_sure_chair,
      ];

      if (step2.some(Boolean)) {
        return STEP_NUMBER.STEP3;
      } else {
        return STEP_NUMBER.STEP2;
      }
    };

    if (isSuccess && data.data && !hasInitialRoutingRan.current) {
      hasInitialRoutingRan.current = true;

      const { service_status: serviceStatus } = data.data;
      switch (serviceStatus) {
        case 'INIT':
          router.push(`${pathname}?step=1`);
          break;
        case 'DOING':
          router.push(`${pathname}?step=${getPausedStep(data.data)}`);
          break;
        case 'FINISHED':
          router.push(`${pathname}/finish`);
      }
    }

    setIsRoutingFinished(true);
  }, [data?.data, isSuccess, router, pathname]);

  useEffect(() => {
    if (isError) {
      router.push(`${pathname}?step=1`);
    }
  }, [isError, router, pathname]);

  useEffect(() => {
    sendGAEvent('start_labeling', {
      event_category: '라벨링 퍼널',
      event_label: '2단계 - 라벨링 시작',
      image_key: params.imageKey,
    });
  }, [params.imageKey]);

  const renderStep = () => {
    switch (currentStep) {
      case STEP_NUMBER.STEP1:
        return (
          <LabelStep1
            key={STEP_NUMBER.STEP1}
            imageKey={params.imageKey}
            currentLabelData={data?.data}
            onNext={handleNextStep}
            onUpdateCache={handleUpdateLabelCache}
          />
        );
      case STEP_NUMBER.STEP2:
        return (
          <LabelStep2
            key={STEP_NUMBER.STEP2}
            imageKey={params.imageKey}
            currentLabelData={data?.data}
            onNext={handleNextStep}
            onUpdateCache={handleUpdateLabelCache}
          />
        );
      case STEP_NUMBER.STEP3:
        return (
          <LabelStep3
            key={STEP_NUMBER.STEP3}
            imageKey={params.imageKey}
            currentLabelData={data?.data}
            onNext={handleNextStep}
            onUpdateCache={handleUpdateLabelCache}
          />
        );
      case STEP_NUMBER.EVENT:
        return (
          <EventStep
            key={STEP_NUMBER.EVENT}
            imageKey={params.imageKey}
          />
        );
      default:
        return (
          <LabelStep1
            key={1}
            imageKey={params.imageKey}
            currentLabelData={data?.data}
            onNext={handleNextStep}
            onUpdateCache={handleUpdateLabelCache}
          />
        );
    }
  };

  if (!isRoutingFinished) return null;

  return (
    <>
      <Header onBack={handleBack} />
      <div className='relative'>
        <AnimatePresence mode='wait'>{renderStep()}</AnimatePresence>
      </div>
    </>
  );
};

export default LabelPage;
