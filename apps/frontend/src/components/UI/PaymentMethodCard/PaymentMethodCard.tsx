import dayjs from "dayjs"
import Icon from "../../icons/Icon"

type PaymentMethodCardProps = {
    card: {
        number: string,
        expiresAt: Date
    }
    editable?: boolean
    onClickEdit?: React.MouseEventHandler<HTMLButtonElement>,
}

export const PaymentMethodCard = ({card, editable, onClickEdit}: PaymentMethodCardProps) => {
  const hashCreditCardNumber = (cardNumber: string) => cardNumber.replace(/\d(?=.{4})/g, "*").match(/.{1,4}/g);
  const formatDateToMonthDay = (date: Date) => dayjs(date).format('MM/DD')
  return (
    <div className='flex p-2 w-full items-center space-x-2'>
        <Icon variant="credit-card" className="text-main-dark p-2 w-10 h-10 bg-main-light rounded-[6px]"/>
        <div>
            <p className="font-medium">{hashCreditCardNumber(card.number)}</p>
            <span className="text-grey-1 font-normal">Expires {formatDateToMonthDay(card.expiresAt)}</span>
        </div>
        {editable ? <button onClick={onClickEdit} className="space-x-1 ml-auto mr-0 flex font-normal text-grey-1"><Icon variant="edit"/>Edit</button> : null}
    </div>
  )
}

