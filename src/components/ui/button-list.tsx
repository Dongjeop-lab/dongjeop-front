import Image from 'next/image';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { ClassName } from '@/types/common';

interface ButtonListProps extends ClassName, PropsWithChildren {}
interface ButtonListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  subTitle?: string;
  selected?: boolean;
}

const ButtonList = ({ children, className }: ButtonListProps) => {
  return <ul className={cn('flex flex-col gap-3', className)}>{children}</ul>;
};

const Item = ({
  title,
  subTitle,
  selected = false,
  className,
  ...props
}: ButtonListItemProps) => {
  return (
    <li>
      <button
        {...props}
        role='option'
        aria-selected={selected}
        className={cn(
          'flex w-full items-center justify-between rounded-xl border p-2.5 pr-5',
          selected ? 'border-[#3491FF]' : 'border-[#00000010]',
          className
        )}
      >
        <div className='flex items-center gap-2.5 p-2.5'>
          <h1
            className={cn(
              'text-#292929',
              selected ? 'font-bold' : 'font-medium'
            )}
          >
            {title}
          </h1>
          {subTitle && (
            <p className='text-sm font-normal text-[#555]'>{subTitle}</p>
          )}
        </div>
        {/* TODO: 나타날 때, 인터렉션이 있으면 좋을 것 같은데 고려 필요 */}
        {selected && (
          <Image
            src='/icons/check.svg'
            width={24}
            height={24}
            alt=''
          />
        )}
      </button>
    </li>
  );
};

ButtonList.Item = Item;

export default ButtonList;
