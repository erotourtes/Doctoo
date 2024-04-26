import { Button, Icon, PaymentMethodCard } from '@/components/UI';

const PaymentMethods = () => {
  return (
    <div className='flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-7'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium'>Payment methods</p>
        <Button type='secondary' onClick={() => {}} className='flex items-center'>
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
