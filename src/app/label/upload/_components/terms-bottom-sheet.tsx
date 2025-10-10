import { useState } from 'react';

import AgreementForm, { Term } from '@/components/ui/agreement-form';
import BottomCTA from '@/components/ui/bottom-cta';
import BottomSheet from '@/components/ui/bottom-sheet';
import { BROWSER_PATH } from '@/lib/path';

interface TermsBottomSheetProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
}

const TERMS: Term[] = [
  {
    id: 'terms-research',
    required: true,
    label: '연구 프로젝트 참여 약관 동의',
    link: BROWSER_PATH.TERMS.RESEARCH_PROJECT,
  },
  {
    id: 'terms-ai',
    required: true,
    label: 'AI 학습용 데이터 수집 및 이용 동의',
    link: BROWSER_PATH.TERMS.IMAGE_COLLECTION,
  },
  {
    id: 'terms-privacy',
    required: true,
    label: '개인정보 비식별화 처리 동의',
    link: BROWSER_PATH.TERMS.PRIVACY_ANONYMIZATION,
  },
  {
    id: 'terms-marketing',
    required: true,
    label: '저작권·초상권 관련 유의사항 동의',
    link: BROWSER_PATH.TERMS.COPYRIGHT_PORTRAIT,
  },
];

const TermsBottomSheet = ({
  isOpen,
  onClose,
  onConfirm,
}: TermsBottomSheetProps) => {
  const [selectedTerms, setSelectedTerms] = useState<Set<string>>(new Set());

  const handleCheck = (id: string) => {
    setSelectedTerms(prev => {
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
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      sheetHeight='380px'
      bottom={
        <BottomCTA>
          <BottomCTA.Button
            variant='primary'
            disabled={selectedTerms.size < TERMS.length}
            onClick={onConfirm}
          >
            확인
          </BottomCTA.Button>
        </BottomCTA>
      }
    >
      <div className='flex flex-col gap-8 px-5'>
        <p className='text-16-bold text-center whitespace-break-spaces'>
          업로드한 사진은 이동약자 접근성 향상을 위한
          <br />
          <span className='text-primary'>AI 학습 연구</span>에만 사용돼요.
          <br />
          약관과 데이터 처리에 동의해 주세요.
        </p>
        <AgreementForm
          terms={TERMS}
          checkedIds={selectedTerms}
          onCheck={handleCheck}
          onCheckAll={isChecked => {
            if (isChecked) {
              setSelectedTerms(new Set(TERMS.map(term => term.id)));
            } else {
              setSelectedTerms(new Set([]));
            }
          }}
        />
      </div>
    </BottomSheet>
  );
};

export default TermsBottomSheet;
