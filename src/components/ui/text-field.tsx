import { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number';
}

const TextField = ({
  type = 'text',
  className,
  inputMode,
  pattern,
  ...props
}: TextFieldProps) => {
  return (
    <input
      {...props}
      inputMode={type === 'number' ? 'decimal' : inputMode}
      pattern={type === 'number' ? '[0-9]*' : pattern}
      type={type}
      className={cn(
        'border-border-default rounded-xl border bg-white py-5 pr-[1.875rem] pl-[1.375rem] text-base font-medium',
        'placeholder:text-base placeholder:font-medium placeholder:text-[#B1B7C1]',
        className
      )}
    />
  );
};

export default TextField;
