import { Variants } from 'motion';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { ClassName } from '@/types/common';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.5,
    },
  },
};

interface ButtonListProps extends ClassName, PropsWithChildren {}
interface ButtonListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  subTitle?: string;
  selected?: boolean;
}

const ButtonList = ({ children, className }: ButtonListProps) => {
  return (
    <motion.ul
      className={cn('flex flex-col gap-3', className)}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {children}
    </motion.ul>
  );
};

const Item = ({
  title,
  subTitle,
  selected = false,
  className,
  ...props
}: ButtonListItemProps) => {
  return (
    <motion.li variants={itemVariants}>
      <button
        {...props}
        role='option'
        aria-selected={selected}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between rounded-xl border p-2.5 pr-5 transition-all duration-75 ease-out active:scale-[0.98]',
          selected ? 'border-[#3491FF]' : 'border-[#00000010]',
          className
        )}
      >
        <span className='flex items-center gap-2.5 p-2.5'>
          <span
            className={cn(
              'text-[#292929]',
              selected ? 'font-bold' : 'font-medium'
            )}
          >
            {title}
          </span>
          {subTitle && (
            <span className='text-sm font-normal text-[#555]'>{subTitle}</span>
          )}
        </span>
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
    </motion.li>
  );
};

ButtonList.Item = Item;

export default ButtonList;
