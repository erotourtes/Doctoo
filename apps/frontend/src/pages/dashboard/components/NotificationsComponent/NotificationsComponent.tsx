import { Button } from '@/components/UI/Button/Button';

export default function NotificationsComponent() {
  return (
    <div className='mt-8 h-[308px] min-h-[308] w-[694px] min-w-[694px] rounded-xl bg-[#ffffff] p-[24px]'>
      <div className='flex flex-row'>
        <h3>Notifications</h3>
        <Button
          className='ml-auto mr-0  h-[28px]  rounded-2xl border-none bg-[#F1F6F9] px-[18px] text-[#454F50]'
          type={'secondary'}
        >
          <p>View all </p>
        </Button>
      </div>
    </div>
  );
}
