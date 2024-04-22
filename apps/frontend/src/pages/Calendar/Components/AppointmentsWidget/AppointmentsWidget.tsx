import dayjs from 'dayjs';
import type { AppointmentsListItemProps } from './AppointmentsListItem';
import AppointmentsListItem from './AppointmentsListItem';
import AppointmentPopup from './AppointmentPopup/AppointmentPopup';
import { useEffect, useState } from 'react';

type AppointmentsWidgetProps = { appointmentsForDay: AppointmentsListItemProps[]; selectedDate: Date };

export default function AppointmentsWidget({ appointmentsForDay, selectedDate }: AppointmentsWidgetProps) {
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentsListItemProps | undefined>();

  function closeModal() {
    setAppointmentModal(false);
    setSelectedAppointment(undefined);
  }

  function openModal() {
    setAppointmentModal(true);
  }

  useEffect(() => {
    if (selectedAppointment) {
      openModal();
    }
  }, [selectedAppointment]);

  return (
    <>
      <article className='flex h-fit min-h-[308px] w-[300px] min-w-[300px] flex-col gap-y-5 rounded-xl bg-white'>
        <h3 className='px-6 pt-6 text-lg font-normal text-black'>
          {dayjs(selectedDate).isSame(dayjs(), 'date') ? (
            <span>{"Today's appointments"}</span>
          ) : (
            <time>Appointments on {dayjs(selectedDate).format('MMM, DD')}</time>
          )}
        </h3>

        {appointmentsForDay.length > 0 ? (
          <ul className='flex w-full flex-col gap-y-3 px-6 pb-6'>
            {appointmentsForDay.map(appointment => {
              const { date, doctor, status } = appointment;
              return (
                <li
                  onClick={() => setSelectedAppointment(appointment)}
                  className='flex cursor-pointer gap-x-2 rounded-xl bg-background px-4 py-2 hover:bg-grey-5'
                  key={`${Math.random()}`}
                >
                  <AppointmentsListItem doctor={doctor} date={date} status={status} />
                </li>
              );
            })}
          </ul>
        ) : (
          <text className='px-6 pb-6 text-grey-1'>
            No appointments for this date. Try to book one or select another day
          </text>
        )}
      </article>

      <AppointmentPopup
        appointmentModal={appointmentModal}
        closeModal={closeModal}
        selectedAppointment={selectedAppointment}
      />
    </>
  );
}
