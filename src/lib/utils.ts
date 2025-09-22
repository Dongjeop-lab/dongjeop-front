import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const extendTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'text-color': [
        'text-primary',
        'text-primary-foreground',
        'text-primary-pressed',
        'text-primary-pressed-foreground',
        'text-primary-disabled',
        'text-primary-disabled-foreground',
        'text-secondary',
        'text-secondary-foreground',
        'text-secondary-pressed',
        'text-secondary-pressed-foreground',
        'text-secondary-disabled',
        'text-secondary-disabled-foreground',
      ],
      'bg-color': [
        'bg-primary',
        'bg-primary-pressed',
        'bg-primary-disabled',
        'bg-secondary',
        'bg-secondary-pressed',
        'bg-secondary-disabled',
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return extendTwMerge(clsx(inputs));
};
