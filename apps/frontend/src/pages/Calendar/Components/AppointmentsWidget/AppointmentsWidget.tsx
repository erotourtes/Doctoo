import dayjs from 'dayjs';
import AppointmentsListItem from './AppointmentsListItem';
import { useEffect, useState } from 'react';
import type { IAppointment } from '@/dataTypes/Appointment';
import AppointmentPopup from './AppointmentPopup/AppointmentPopup';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchReviewsByDoctor } from '@/app/review/ReviewThunks';

type AppointmentsWidgetProps = { appointmentsForDay: IAppointment[]; selectedDate: Date };

export default function AppointmentsWidget({ appointmentsForDay, selectedDate }: AppointmentsWidgetProps) {
  const dispatch = useAppDispatch();
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>();

  const reviews = useAppSelector(state => state.review.reviews);

  useEffect(() => {
    if (reviews) {
      setAppointmentModal(true);
    }
  }, [reviews, selectedAppointment]);

  function closeModal() {
    setAppointmentModal(false);
    setSelectedAppointment(undefined);
  }

  function openAppointmentModal(appointment: IAppointment, doctorId: string) {
    setSelectedAppointment(appointment);
    dispatch(fetchReviewsByDoctor({ doctorId, includeNames: 'true', skip: '0', take: '2' }));
  }

  return (
    <>
      <article className='flex h-fit w-full flex-col gap-y-3 rounded-xl bg-white p-3 sm:gap-y-5 sm:p-6 lg:min-h-[308px] lg:max-w-[300px]'>
        <h3 className='text-lg font-normal text-black'>
          {dayjs(selectedDate).isSame(dayjs(), 'date') ? (
            'Today`s appointments'
          ) : (
            <time>Appointments on {dayjs(selectedDate).format('MMM, DD')}</time>
          )}
        </h3>

        {appointmentsForDay.length > 0 ? (
          <ul className='flex w-full flex-col gap-y-3'>
            {appointmentsForDay.map((appointment, idx) => {
              const { startedAt, doctor, doctorId } = appointment;

              return (
                <li
                  onClick={() => openAppointmentModal(appointment, doctorId)}
                  className='flex cursor-pointer flex-col items-center gap-2 gap-x-2 rounded-xl bg-background p-4 hover:bg-grey-5 sm:flex-row sm:py-2'
                  key={`appointment-widget-${idx}`}
                >
                  <AppointmentsListItem doctor={doctor} date={startedAt} />
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
          reviews={reviews}
        />
      )}
    </>
  );
}
