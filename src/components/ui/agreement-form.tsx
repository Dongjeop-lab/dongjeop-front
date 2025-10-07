import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export interface Term {
  id: string;
  required: boolean;
  label: string;
  link?: string;
}

interface AgreementFormProps {
  terms: Term[];
  checkedIds: Set<string>;
  hideAgreeAll?: boolean;
  onCheck: (id: string) => void;
  onCheckAll?: (isChecked: boolean) => void;
}

const SELECTED_ICON_SRC = '/icons/check-blue.svg';
const UNSELECTED_ICON_SRC = '/icons/check-disabled.svg';

const AgreementForm = ({
  terms,
  checkedIds,
  hideAgreeAll = false,
  onCheck,
  onCheckAll,
}: AgreementFormProps) => {
  const isAllChecked = terms.length > 0 && checkedIds.size === terms.length;

  const handleCheckAll = () => {
    if (hideAgreeAll || !onCheckAll) return;

    if (isAllChecked) {
      onCheckAll(false);
      return;
    }

    onCheckAll(true);
  };

  const renderLink = (link?: string) => {
    if (!link) return null;

    const isExternal = link.startsWith('http');

    return (
      <Link
        href={link}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <Image
          alt={`약관 보기 ${isExternal ? '새 창 열림' : ''}`}
          src='/icons/navigation-next.svg'
          width={5}
          height={10}
          className='h-[10px] w-[5px]'
        />
      </Link>
    );
  };

  return (
    <div>
      {!hideAgreeAll && (
        <label
          className={cn(
            'mb-1 flex items-center gap-2 py-1.5',
            'transition-all duration-75 ease-out active:scale-[0.99]'
          )}
        >
          <input
            type='checkbox'
            className='hidden'
            checked={isAllChecked}
            onChange={handleCheckAll}
          />
          <Image
            alt=''
            src={isAllChecked ? SELECTED_ICON_SRC : UNSELECTED_ICON_SRC}
            width={18}
            height={18}
          />
          <span className='text-14-bold text-[#292929]'>약관 전체 동의</span>
        </label>
      )}
      {terms.map(({ id, label, link, required }) => {
        return (
          <div
            key={id}
            className={cn(
              'flex items-center justify-between py-1.5',
              'transition-all duration-75 ease-out active:scale-[0.99]'
            )}
          >
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                className='hidden'
                checked={checkedIds.has(id)}
                onChange={() => onCheck(id)}
              />
              <Image
                alt=''
                src={
                  checkedIds.has(id) ? SELECTED_ICON_SRC : UNSELECTED_ICON_SRC
                }
                width={18}
                height={18}
              />
              <span className='text-[0.8125rem] text-[#767676]'>
                {required ? '[필수] ' : '[선택] '}
                {label}
              </span>
            </label>
            {renderLink(link)}
          </div>
        );
      })}
    </div>
  );
};

export default AgreementForm;
