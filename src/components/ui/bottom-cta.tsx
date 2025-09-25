import {
  ButtonHTMLAttributes,
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from 'react';

import { cn } from '@/lib/utils';
import { ClassName } from '@/types/common';

interface BottomCTAProps extends ClassName, PropsWithChildren {
  ratio?: '1:1' | '1:2';
}

interface BottomCTAButtonProps extends ClassName, PropsWithChildren {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  label?: string;
  onClick?: VoidFunction;
}

const BOTTOM_CTA_CLASSNAME = 'fixed right-0 bottom-0 left-0';
const BOTTOM_CTA_INNER_CLASSNAME = 'flex mx-auto h-14 w-full';
const BUTTON_WIDTHS = {
  '1:1': ['w-1/2', 'w-1/2'],
  '1:2': ['w-1/3', 'w-2/3'],
} as const;

const BottomCTA = ({ ratio = '1:1', children, className }: BottomCTAProps) => {
  const validButtons = Children.toArray(children).filter(child =>
    isValidElement(child)
  ) as ReactElement<BottomCTAButtonProps>[];

  const buttonCount = validButtons.length;
  return (
    <footer className={BOTTOM_CTA_CLASSNAME}>
      <div className='absolute top-0 right-0 bottom-0 left-0 -z-10 bg-white' />
      <div className={cn(BOTTOM_CTA_INNER_CLASSNAME, className)}>
        {validButtons.map((button, index) => {
          let widthClassName: string;

          if (buttonCount === 1) {
            widthClassName = 'w-full';
          } else if (buttonCount === 2) {
            widthClassName = BUTTON_WIDTHS[ratio][index];
          } else {
            widthClassName = 'flex-1';
          }

          return cloneElement(button, {
            className: cn(widthClassName, button.props.className),
          });
        })}
      </div>
    </footer>
  );
};

const BUTTON_VARIANT_CLASSNAME = {
  primary:
    'bg-primary text-primary-foreground active:bg-primary-pressed active:text-primary-pressed-foreground disabled:bg-primary-disabled disabled:text-primary-disabled-foreground',
  secondary:
    'bg-secondary text-secondary-foreground active:bg-secondary-pressed active:text-secondary-pressed-foreground disabled:bg-secondary-disabled disabled:text-secondary-disabled-foreground',
} as const;

const Button = ({
  children,
  variant,
  className,
  disabled,
  type = 'button',
  onClick,
}: BottomCTAButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        BUTTON_VARIANT_CLASSNAME[variant],
        'text-18-semibold h-14 rounded-none transition-all duration-100 ease-out',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

BottomCTA.Button = Button;

export default BottomCTA;
