import Image from 'next/image';

interface FinishStep1Props {
  seqNo: number;
}

const FinishStep1 = ({ seqNo }: FinishStep1Props) => {
  return (
    <>
      {/* XXX: Status bar 높이까지 section의 padding-top에 포함한 상태 */}
      <section className='flex w-[360px] flex-1 flex-col items-center justify-center px-12.5 pt-24.5'>
        <div className='flex flex-col items-center gap-y-2.5 pt-7.5 pb-5'>
          <p className='text-18-semibold text-primary'>사진 등록 완료!</p>
          <h2 className='text-26-bold text-center'>
            {seqNo}번째 기여자세요!
            <br />
            함께해 주셔서 감사해요.
          </h2>
        </div>

        <Image
          src='/images/finish/stairs-finish-2.svg'
          className='relative my-7.5 overflow-hidden rounded-2xl'
          alt=''
          aria-hidden='true'
          width={280}
          height={260}
        />
      </section>

      {/* 반원 그라데이션 */}
      <div className='relative w-full flex-1'>
        <div className='absolute -bottom-18 left-1/2 h-36 w-full -translate-x-1/2 rounded-[50%/100%_100%_0_0] bg-[#ff8a00] opacity-30 blur-[180px]' />
      </div>
    </>
  );
};

export default FinishStep1;
