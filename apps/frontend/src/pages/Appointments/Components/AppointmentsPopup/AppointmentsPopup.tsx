import { IAppointment } from '@/dataTypes/Appointment';
import PopupBody from './PopupBody';
import PopupHeader from './PopupHeader';
import AppointmentButtons from '../AppointmentsList/ItemButtons';
import AppointmentLinks from '../AppointmentsList/ItemLinks';

type AppointmentPopupProps = { appointment: IAppointment };

export default function AppointmentsPopup({ appointment }: AppointmentPopupProps) {
  const { doctor, assignedAt, status, videoRecordKey, notes } = appointment;
  const { firstName, lastName, avatarKey } = doctor;
  const fullName = `Dr. ${firstName} ${lastName}`;

  return (
    <div className='flex flex-col justify-between gap-y-8'>
      <div className='flex flex-col gap-y-4'>
        <PopupHeader assignedAt={assignedAt} status={status} />
        <PopupBody fullName={fullName} avatarKey={avatarKey} />
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-base font-normal text-grey-2'>Attached files:</span>

        <div className='self-end'>
          <AppointmentLinks videoRecordKey={videoRecordKey} notes={notes} />
        </div>
      </div>

      <div className='flex gap-x-4 self-end'>
        <AppointmentButtons status={status} />
      </div>
    </div>
  );
}
