import { TermsContent } from '../types';

interface TermsContentProps {
  content: TermsContent;
}

const TermsContentComponent = ({ content }: TermsContentProps) => {
  return (
    <>
      {/* Title */}
      <h1 className='text-22-bold mb-2 text-black'>{content.title}</h1>

      {/* Subtitle */}
      <div className='text-14-medium mb-8 whitespace-pre-line text-[#727272]'>
        {content.subtitle}
      </div>

      {/* Sections */}
      <div className='space-y-5'>
        {content.sections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className='text-16-semibold mb-2 text-[#292929]'>
              {section.title}
            </h2>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className='text-14-medium leading-[130%] text-[#727272]'
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
};

export default TermsContentComponent;
