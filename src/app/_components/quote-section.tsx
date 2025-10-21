import Image from 'next/image';

interface QuoteSectionProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
}

const QuoteSection = ({
  children,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
}: QuoteSectionProps) => {
  return (
    <div
      className={`flex items-center gap-2 break-keep ${
        imagePosition === 'right' ? 'flex-row-reverse' : ''
      }`}
    >
      <Image
        src={imageSrc}
        width={64}
        height={64}
        alt={imageAlt}
        className='h-16 w-16 flex-shrink-0'
      />

      <figure className='rounded-xl bg-[#FFF1DA] px-[21px] py-[10px] whitespace-pre-line'>
        <blockquote className='text-14-regular'>{children}</blockquote>
      </figure>
    </div>
  );
};

export default QuoteSection;
