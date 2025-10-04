import BottomCTA from '@/components/ui/bottom-cta';
import TextField from '@/components/ui/text-field';

const EventFormSection = () => {
  return (
    <div className='flex flex-col items-center gap-6'>
      <form className='flex w-full flex-col gap-3'>
        <TextField placeholder='이름을 입력해주세요' />
        <TextField
          placeholder='전화번호를 입력해주세요'
          type='number'
        />
        <BottomCTA>
          <BottomCTA.Button
            type='submit'
            variant='primary'
          >
            완료
          </BottomCTA.Button>
        </BottomCTA>
      </form>
      <p className='text-secondary-foreground text-center text-[0.9375rem] font-normal'>
        입력하신 번호는 리워드 지급 외에는
        <br />
        사용되지 않습니다.
      </p>
    </div>
  );
};

export default EventFormSection;
