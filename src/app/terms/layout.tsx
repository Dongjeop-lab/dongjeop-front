import TermsHeader from '@/app/terms/_components/terms-header';

interface TermsLayoutProps {
  children: React.ReactNode;
}

const TermsLayout = ({ children }: TermsLayoutProps) => {
  return (
    <div className='min-h-screen bg-white'>
      <TermsHeader />

      <main className='px-5 pb-5'>{children}</main>
    </div>
  );
};

export default TermsLayout;
