import { Button } from '@/components/UI/Button/Button';
import { PaymentMethodCard } from '@/components/UI/PaymentMethodCard/PaymentMethodCard';
import Icon from '@/components/icons/Icon';

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

      <PaymentMethodCard editable card={{ number: '1111 2222 3333 4444', expiresAt: new Date() }} />
    </div>
  );
};

export default PaymentMethods;
