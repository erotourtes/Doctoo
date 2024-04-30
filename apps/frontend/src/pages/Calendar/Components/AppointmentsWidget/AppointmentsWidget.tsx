import dayjs from 'dayjs';
import AppointmentsListItem from './AppointmentsListItem';
import { useState } from 'react';
import type { IAppointment } from '@/dataTypes/Appointment';
import AppointmentPopup from './AppointmentPopup/AppointmentPopup';

type AppointmentsWidgetProps = { appointmentsForDay: IAppointment[]; selectedDate: Date };

export default function AppointmentsWidget({ appointmentsForDay, selectedDate }: AppointmentsWidgetProps) {
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>();

  function closeModal() {
    setAppointmentModal(false);
    setSelectedAppointment(undefined);
  }

  function openAppointmentModal(appointment: IAppointment) {
    setSelectedAppointment(appointment);
    setAppointmentModal(true);
  }

  return (
    <>
      <article className='flex h-fit w-full max-w-[300px] flex-col gap-y-3 rounded-xl bg-white p-3 sm:gap-y-5  sm:p-6'>
        <h3 className='text-lg font-normal text-black'>
          {dayjs(selectedDate).isSame(dayjs(), 'date') ? (
            'Today`s appointments'
          ) : (
            <time>Appointments on {dayjs(selectedDate).format('MMM, DD')}</time>
          )}
        </h3>

        {appointmentsForDay.length > 0 ? (
          <ul className='flex w-full flex-col gap-y-3'>
            {appointmentsForDay.map(appointment => {
              const { assignedAt: date, doctor } = appointment;

              return (
                <li
                  onClick={() => openAppointmentModal(appointment)}
                  className='flex cursor-pointer flex-col items-center gap-2 gap-x-2 rounded-xl bg-background p-4 hover:bg-grey-5 sm:flex-row sm:py-2'
                  key={`${Math.random()}`}
                >
                  <AppointmentsListItem doctor={doctor} date={date} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className='text-sm text-grey-1 sm:text-base'>
            No appointments for this date. Try to book one or select another day
          </p>
        )}
      </article>

      {appointmentModal && selectedAppointment && (
        <AppointmentPopup
          appointmentModal={appointmentModal}
          closeModal={closeModal}
          selectedAppointment={selectedAppointment}
        />
      )}
    </>
  );
}
