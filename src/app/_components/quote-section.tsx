import Image from 'next/image';
import { useMemo } from 'react';

interface QuoteSectionProps {
  quote: string;
  highlightedTexts?: string[];
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
}

const QuoteSection = ({
  quote,
  highlightedTexts = [],
  imageSrc,
  imageAlt,
  imagePosition = 'left',
}: QuoteSectionProps) => {
  // useMemo로 파싱 결과를 메모이제이션
  const renderedQuote = useMemo(() => {
    if (highlightedTexts.length === 0) {
      return quote;
    }

    // 정규식을 사용해서 한 번에 모든 강조 텍스트를 찾아서 처리
    const regex = new RegExp(
      `(${highlightedTexts
        .map(
          text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 특수문자 이스케이프
        )
        .join('|')})`,
      'g'
    );

    const parts = quote.split(regex);

    return parts
      .map((part, index) => {
        // 강조해야 할 텍스트인지 확인
        const shouldHighlight = highlightedTexts.includes(part);

        if (shouldHighlight) {
          return (
            <span
              key={index}
              className='text-14-semibold'
            >
              {part}
            </span>
          );
        }

        return part || null;
      })
      .filter(Boolean);
  }, [quote, highlightedTexts]);

  return (
    <div
      className={`flex items-center gap-2 ${
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
        <blockquote className='text-14-regular'>{renderedQuote}</blockquote>
      </figure>
    </div>
  );
};

export default QuoteSection;
