'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { apiClient } from '@/app/api/client';
import AgreementForm, { Term } from '@/components/ui/agreement-form';
import BottomCTA from '@/components/ui/bottom-cta';
import TextField from '@/components/ui/text-field';
import { API_PATH, BROWSER_PATH } from '@/lib/path';

const TERMS_ID = {
  PRIVACY_REWARD_AGREE: 'privacy-reward-agree',
  PRIVACY_FEEDBACK_AGREE: 'privacy-feedback-agree',
};

const TERMS: Term[] = [
  {
    id: TERMS_ID.PRIVACY_REWARD_AGREE,
    required: true,
    label: '개인정보 수집·이용 동의 (리워드 지급 목적)',
    link: BROWSER_PATH.TERMS.REWARD_COLLECTION,
  },
  {
    id: TERMS_ID.PRIVACY_FEEDBACK_AGREE,
    required: false,
    label: '개인정보 수집·이용 동의 (피드백 요청 목적)',
    link: BROWSER_PATH.TERMS.FEEDBACK_COLLECTION,
  },
];

const PHONE_NUMBER_LENGTH = 11;

interface EventFormSectionProps {
  imageKey: string;
}

const EventFormSection = ({ imageKey }: EventFormSectionProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const router = useRouter();

  const handleMoveFinish = () => {
    router.push(BROWSER_PATH.LABEL.FINISH(imageKey));
  };

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: () =>
      apiClient.patch(`${API_PATH.UPLOAD}/${imageKey}/registrants`, {
        phone_number: phoneNumber,
        privacy_feedback_agreed: checkedIds.has(TERMS_ID.PRIVACY_FEEDBACK_AGREE)
          ? 1
          : 0,
      }),
    onSuccess: () => {
      handleMoveFinish();
    },
    onError: () => {
      toast.error('오류가 발생했어요. 다시 시도해주세요.');
    },
  });

  const handleCheck = (id: string) => {
    setCheckedIds(prev => {
      const newCheckedIds = new Set(prev);

      if (newCheckedIds.has(id)) {
        newCheckedIds.delete(id);
      } else {
        newCheckedIds.add(id);
      }
      return newCheckedIds;
    });
  };

  return (
    <>
      <div className='mb-6 flex flex-col gap-8 px-5'>
        <div className='flex flex-col gap-6'>
          <TextField
            placeholder='전화번호를 입력해주세요'
            inputMode='numeric'
            pattern='[0-9]*'
            value={phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
            onChange={e => {
              const digitsOnly = e.target.value.replace(/\D/g, '');
              setPhoneNumber(digitsOnly.slice(0, PHONE_NUMBER_LENGTH));
            }}
          />
          <p className='text-center text-[0.9375rem] font-normal text-[#999]'>
            개인정보는 리워드 지급과 피드백 요청에만 사용돼요.
            <br />
            문자/연구팀 카카오톡 채널을 통해 메시지를 받을 수 있어요.
          </p>
        </div>
        <AgreementForm
          terms={TERMS}
          checkedIds={checkedIds}
          onCheck={handleCheck}
          onCheckAll={isChecked => {
            if (isChecked) {
              setCheckedIds(new Set(TERMS.map(term => term.id)));
            } else {
              setCheckedIds(new Set([]));
            }
          }}
        />
      </div>
      <BottomCTA ratio='1:2'>
        <BottomCTA.Button
          variant='secondary'
          onClick={handleMoveFinish}
        >
          건너뛰기
        </BottomCTA.Button>
        <BottomCTA.Button
          type='button'
          disabled={
            isPending ||
            phoneNumber.length < PHONE_NUMBER_LENGTH ||
            !checkedIds.has(TERMS_ID.PRIVACY_REWARD_AGREE)
          }
          variant='primary'
          onClick={handleSubmit}
        >
          이벤트 참여하기
        </BottomCTA.Button>
      </BottomCTA>
    </>
  );
};

export default EventFormSection;
