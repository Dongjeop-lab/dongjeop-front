import Image from 'next/image';

interface StepItemProps {
  icon: string;
  title: string;
}

const StepItem = ({ icon, title }: StepItemProps) => {
  return (
    <article className='flex min-w-[320px] items-center gap-4 rounded-2xl bg-[#FFFFFF80] p-2'>
      <figure className='flex-shrink-0'>
        <Image
          src={icon}
          width={48}
          height={48}
          alt=''
          className='h-12 w-12'
        />
      </figure>

      <h4 className='text-14-semibold mb-1 whitespace-pre-line'>{title}</h4>
    </article>
  );
};

export default StepItem;
