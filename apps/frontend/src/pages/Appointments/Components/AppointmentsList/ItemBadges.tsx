import { Badge } from '@/components/UI';

type StatusColors = {
  [key: string]: {
    badgeColor: string;
    labelColor: string;
  };
};

const statusColors: StatusColors = {
  PLANNED: { badgeColor: 'main-light', labelColor: 'main' },
  COMPLETED: { badgeColor: 'orange-light', labelColor: 'orange' },
  CANCELED: { badgeColor: 'error-light', labelColor: 'error' },
};

type AppointmentBadgesProps = { status: string; paymentInvoiceKey?: string; paymentReceiptKey?: string };

export default function AppointmentBadges({ status, paymentInvoiceKey, paymentReceiptKey }: AppointmentBadgesProps) {
  return (
    <div className='flex gap-x-3'>
      <Badge badgeColor={statusColors[status].badgeColor} labelColor={statusColors[status].labelColor}>
        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
      </Badge>
      {paymentReceiptKey !== undefined && (
        <Badge badgeColor={statusColors['COMPLETED'].badgeColor} labelColor={statusColors['COMPLETED'].labelColor}>
          Paid
        </Badge>
      )}
      {paymentInvoiceKey !== undefined && paymentReceiptKey === undefined && (
        <Badge badgeColor={statusColors['PLANNED'].badgeColor} labelColor={statusColors['PLANNED'].labelColor}>
          Waiting for payment
        </Badge>
      )}
    </div>
  );
}
