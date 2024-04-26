import { Button, Icon, PaymentMethodCard } from '@/components/UI';

const PaymentMethods = () => {
  return (
    <div className='flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-3 md:p-7'>
      <div className='flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
        <h3 className='text-lg font-medium text-black'>Payment methods</h3>
        <Button
          type='secondary'
          onClick={() => {}}
          className='flex w-3/4 items-center justify-center gap-2 sm:max-w-[140px]'
        >
          <Icon variant='plus' />
          Add
        </Button>
      </div>

      <PaymentMethodCard
        editable
        card={{ number: '1111 2222 3333 4444', expiresAt: new Date('2024-01-01T00:00:00.000Z') }}
      />
    </div>
  );
};

export default PaymentMethods;
