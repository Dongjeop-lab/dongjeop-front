'use client';

import { useState } from 'react';

import AgreementForm, { Term } from '@/components/ui/agreement-form';
import BottomCTA from '@/components/ui/bottom-cta';
import TextField from '@/components/ui/text-field';

// TODO: 약관 링크 연결 필요
const TERMS: Term[] = [
  {
    id: 'privacy-reward',
    required: true,
    label: '개인정보 수집·이용 동의 (리워드 지급 목적)',
  },
  {
    id: 'privacy-feedback',
    required: false,
    label: '개인정보 수집·이용 동의 (피드백 요청 목적)',
  },
];

const EventFormSection = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

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
            type='number'
          />
          <p className='text-secondary-foreground text-center text-[0.9375rem] font-normal'>
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
          type='submit'
          variant='secondary'
        >
          건너뛰기
        </BottomCTA.Button>
        <BottomCTA.Button
          type='submit'
          variant='primary'
        >
          이벤트 참여하기
        </BottomCTA.Button>
      </BottomCTA>
    </>
  );
};

export default EventFormSection;
