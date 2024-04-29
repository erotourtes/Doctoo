import { Badge } from '@/components/UI';
import type { BadgeColorKeys, LabelColorKeys } from '@/components/UI/Badge/Badge';
import type { AppointmentStatus } from '@/dataTypes/Appointment';

type StatusColors = {
  [key in AppointmentStatus]: { badgeColor: BadgeColorKeys; labelColor: LabelColorKeys };
};

const statusColors: StatusColors = {
  PENDING_PAYMENT: { badgeColor: 'bg-orange-light', labelColor: 'text-orange' },
  PLANNED: { badgeColor: 'bg-main-light', labelColor: 'text-main' },
  COMPLETED: { badgeColor: 'bg-orange-light', labelColor: 'text-orange' },
  CANCELED: { badgeColor: 'bg-error-light', labelColor: 'text-error' },
};

type AppointmentBadgesProps = { status: AppointmentStatus; paymentInvoiceKey?: string; paymentReceiptKey?: string };

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
