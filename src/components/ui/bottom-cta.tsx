import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { ClassName } from '@/types/common';

interface BottomCTAProps extends ClassName, PropsWithChildren {}

interface BottomCTASingleProps extends ClassName, BottomCTAProps {}

interface BottomCTADoubleProps extends ClassName {
  ratio: '1:1' | '1:2';
  leftButtonProps: BottomCTAButtonProps;
  rightButtonProps: BottomCTAButtonProps;
}

interface BottomCTAButtonProps extends ClassName, PropsWithChildren {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  label?: string;
  onClick?: VoidFunction;
}

const BOTTOM_CTA_CLASSNAME = 'fixed right-0 bottom-0 left-0';
// TODO: 너비 확정 시 적용 필요
const BOTTOM_CTA_INNER_CLASSNAME = 'mx-auto h-14 w-full';

const BottomCTA = ({ children, className }: BottomCTAProps) => {
  return (
    <footer className={BOTTOM_CTA_CLASSNAME}>
      <div className={cn(BOTTOM_CTA_INNER_CLASSNAME, className)}>
        {children}
      </div>
    </footer>
  );
};

const Single = ({ children, className }: BottomCTASingleProps) => {
  return (
    <footer className={BOTTOM_CTA_CLASSNAME}>
      <div className={cn(BOTTOM_CTA_INNER_CLASSNAME, className)}>
        {children}
      </div>
    </footer>
  );
};

const Double = ({
  ratio,
  className,
  leftButtonProps,
  rightButtonProps,
}: BottomCTADoubleProps) => {
  return (
    <footer className={BOTTOM_CTA_CLASSNAME}>
      <div className={cn(BOTTOM_CTA_INNER_CLASSNAME, className)}>
        <Button
          {...leftButtonProps}
          className={cn(
            ratio === '1:1' ? 'w-1/2' : 'w-1/3',
            leftButtonProps.className
          )}
        />
        <Button
          {...rightButtonProps}
          className={cn(
            ratio === '1:1' ? 'w-1/2' : 'w-2/3',
            rightButtonProps.className
          )}
        />
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
  label,
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
        'text-18-semibold h-14 w-full rounded-none transition-all duration-100 ease-out',
        className
      )}
      onClick={onClick}
    >
      {label ? label : children}
    </button>
  );
};

BottomCTA.Single = Single;
BottomCTA.Button = Button;
BottomCTA.Double = Double;

export default BottomCTA;
