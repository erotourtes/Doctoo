import { useAppSelector } from '@/app/hooks';
import AppointmentsListItem from './AppointmentsListItem';
import PopupDoctoo from '@/components/UI/Popup/Popup';
import { useState } from 'react';
import AppointmentsPopup from '../AppointmentsPopup/AppointmentsPopup';
import type { IAppointment } from '@/dataTypes/Appointment';
import type { FilterState } from '../../AppointmentsPage';
import dayjs from 'dayjs';
import { filterConfig } from '../AppointmentsFilters/AppointmentsFilters';

type AppointmentsListProps = { filters: FilterState };

export default function AppointmentsList({ filters }: AppointmentsListProps) {
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

  function filterAppointments(appointment: IAppointment): boolean {
    const appointmentTime = dayjs.utc(appointment.assignedAt).format('hh:mm a');

    const passesTimeFilter =
      filters.time.includes(filterConfig.time.defaultValue) || filters.time.includes(appointmentTime);

    const passesStatusFilter =
      filters.statuses.includes(filterConfig.statuses.defaultValue) || filters.statuses.includes(appointment.status);

    const fullName = `Dr. ${appointment.doctor!.firstName} ${appointment.doctor!.lastName}`;
    const passesDoctorFilter =
      filters.doctors.includes(filterConfig.doctors.defaultValue) || filters.doctors.includes(fullName);

    return passesTimeFilter && passesStatusFilter && passesDoctorFilter;
  }

  function sortAppointments(a: IAppointment, b: IAppointment): number {
    if (filters.order.includes('Latest to oldest')) {
      return dayjs(b.assignedAt).valueOf() - dayjs(a.assignedAt).valueOf();
    } else {
      return dayjs(a.assignedAt).valueOf() - dayjs(b.assignedAt).valueOf();
    }
  }

  const filteredAppointments = appointments.filter(filterAppointments).sort(sortAppointments);

  return (
    <>
      <div style={hideScrollbarStyle} className='flex flex-1 flex-col gap-y-4 p-1'>
        {filteredAppointments.map(appointment => (
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
