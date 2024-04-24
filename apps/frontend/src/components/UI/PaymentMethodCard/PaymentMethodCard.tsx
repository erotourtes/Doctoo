import dayjs from 'dayjs';
import Icon from '@UI/Icon/Icon';

type PaymentMethodCardProps = {
  card: {
    number: string;
    expiresAt: Date;
  };
  editable?: boolean;
  onClickEdit?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PaymentMethodCard = ({ card, editable, onClickEdit }: PaymentMethodCardProps) => {
  const hashCreditCardNumber = (cardNumber: string) => cardNumber.replace(/\d(?=.{4})/g, '*').match(/.{1,4}/g);
  const formatDateToMonthDay = (date: Date) => dayjs(date).format('MM/DD');
  return (
    <div className='flex w-full items-center space-x-2 p-2'>
      <Icon variant='credit-card' className='h-10 w-10 rounded-[6px] bg-main-light p-2 text-main-dark' />
      <div className='w-full'>
        <p className='font-medium'>{hashCreditCardNumber(card.number)}</p>
        <span className='font-normal text-grey-1'>Expires {formatDateToMonthDay(card.expiresAt)}</span>
      </div>
      {editable ? (
        <button onClick={onClickEdit} className='ml-auto mr-0 flex space-x-1 font-normal text-grey-1'>
          <Icon variant='edit' />
          Edit
        </button>
      ) : null}
    </div>
  );
};
