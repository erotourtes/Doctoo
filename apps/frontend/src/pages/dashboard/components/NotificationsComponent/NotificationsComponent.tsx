import { Button } from '@/components/UI/Button/Button';

export default function NotificationsComponent() {
  return (
    <div className='min-h-[308px] w-full rounded-xl bg-white p-2 sm:p-6'>
      <div className='flex flex-row justify-between gap-2'>
        <h3 className='text-lg'>Notifications</h3>
        <Button className='h-[28px] rounded-2xl border-none bg-background px-[18px] text-text' type={'secondary'}>
          <p>View all </p>
        </Button>
      </div>
    </div>
  );
}
