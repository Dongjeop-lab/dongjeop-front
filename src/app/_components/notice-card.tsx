interface NoticeCardProps {
  title: string;
  children: React.ReactNode;
}

const NoticeCard = ({ title, children }: NoticeCardProps) => {
  return (
    <article className='flex w-[19.8125rem] flex-col rounded-xl bg-white p-5'>
      <header className='mb-4 text-center'>
        <h3 className='text-center text-[1rem] leading-[100%] font-bold tracking-[-0.03125rem] text-[#080808]'>
          {title}
        </h3>
      </header>
      <div className='text-secondary-foreground text-center text-[0.875rem] leading-[100%] font-medium tracking-[-0.03125rem]'>
        {children}
      </div>
    </article>
  );
};

export default NoticeCard;
