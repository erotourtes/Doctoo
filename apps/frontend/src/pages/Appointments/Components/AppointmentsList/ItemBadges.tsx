import AppointmentBadge from '../AppointmentBadge';

type StatusColors = {
  [key: string]: {
    badgeColor: string;
    labelColor: string;
  };
};

const statusColors: StatusColors = {
  Planned: { badgeColor: 'main-light', labelColor: 'main' },
  Completed: { badgeColor: 'orange-light', labelColor: 'orange' },
  Canceled: { badgeColor: 'error-light', labelColor: 'error' },
};

type AppointmentBadgesProps = { status: string; paymentInvoiceKey?: string; paymentReceiptKey?: string };

export default function AppointmentBadges({ status, paymentInvoiceKey, paymentReceiptKey }: AppointmentBadgesProps) {
  return (
    <div className='flex gap-x-3'>
      <AppointmentBadge
        label={status}
        badgeColor={statusColors[status].badgeColor}
        labelColor={statusColors[status].labelColor}
      />
      {paymentReceiptKey !== undefined && (
        <AppointmentBadge
          label='Paid'
          badgeColor={statusColors['Completed'].badgeColor}
          labelColor={statusColors['Completed'].labelColor}
        />
      )}
      {paymentInvoiceKey !== undefined && paymentReceiptKey === undefined && (
        <AppointmentBadge
          label='Waiting for payment'
          badgeColor={statusColors['Planned'].badgeColor}
          labelColor={statusColors['Planned'].labelColor}
        />
      )}
    </div>
  );
}
