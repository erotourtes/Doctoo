import { useAppSelector } from '@/app/hooks';
import AppointmentsListItem from './AppointmentsListItem';
import PopupDoctoo from '@/components/UI/Popup/Popup';
import { useState } from 'react';
import AppointmentsPopup from '../AppointmentsPopup/AppointmentsPopup';
import type { IAppointment } from '@/dataTypes/Appointment';
import type { FilterState } from '../../AppointmentsPage';

type AppointmentsListProps = { filters: FilterState };

export default function AppointmentsList({}: AppointmentsListProps) {
  const appointments = useAppSelector(state => state.appointment.appointments);
  const [modal, setModal] = useState(false);
  const [appointment, setAppointment] = useState<IAppointment>();

  function closeModal(): void {
    setModal(false);
  }

  function openModal(appointment: IAppointment): void {
    setAppointment(appointment);
    setModal(true);
  }

  const hideScrollbarStyle: React.CSSProperties = {
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  return (
    <>
      <div style={hideScrollbarStyle} className='flex flex-1 flex-col gap-y-4 p-1'>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <AppointmentsListItem appointment={appointment} openModal={() => openModal(appointment)} />
          </li>
        ))}
      </div>

      <PopupDoctoo
        popupIsOpen={modal}
        closePopup={closeModal}
        modalBodyClassName={''}
        modalFullClassName='max-w-[700px]'
      >
        {appointment && <AppointmentsPopup appointment={appointment} />}
      </PopupDoctoo>
    </>
  );
}
