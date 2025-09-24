import Image from 'next/image';

interface HeaderProps {
  onBack: VoidFunction;
  onClose?: VoidFunction;
}

const Header = ({ onBack, onClose }: HeaderProps) => {
  return (
    <>
      <header className='absolute top-0 left-0 flex h-11 w-full items-center justify-between px-4'>
        <button onClick={onBack}>
          <Image
            src='/icons/navigation-back.svg'
            alt='뒤로 가기'
            width={24}
            height={24}
          />
        </button>
        {onClose && (
          <button onClick={onClose}>
            <Image
              src='/icons/navigation-close.svg'
              alt='닫기'
              width={24}
              height={24}
            />
          </button>
        )}
      </header>
      <div className='h-11' />
    </>
  );
};

export default Header;
