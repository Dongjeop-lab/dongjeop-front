import { useState } from 'react';

import AgreementForm, { Term } from '@/components/ui/agreement-form';
import BottomCTA from '@/components/ui/bottom-cta';
import BottomSheet from '@/components/ui/bottom-sheet';

interface TermsBottomSheetProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
}

const TERMS: Term[] = [
  {
    id: 'service',
    required: true,
    label: '서비스 이용 약관',
    terms: 'SERVICE',
  },
  {
    id: 'privacy-policy',
    required: true,
    label: '개인정보 처리방침',
    terms: 'PRIVACY_POLICY',
  },
  {
    id: 'terms-ai',
    required: true,
    label: '이미지 수집 이용 및 AI 학습 동의',
    terms: 'IMAGE_COLLECTION_TERMS',
  },
  {
    id: 'terms-privacy',
    required: true,
    label: '개인정보 비식별화 처리 동의',
    terms: 'PRIVACY_ANONYMIZATION_TERMS',
  },
  {
    id: 'terms-marketing',
    required: true,
    label: '저작권·초상권 관련 유의사항 동의',
    terms: 'COPYRIGHT_PORTRAIT_TERMS',
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
      sheetHeight='430px'
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
          <span className='text-primary'>AI 학습 연구</span>에만 사용돼요
          <br />
          약관과 데이터 처리에 동의해 주세요
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
