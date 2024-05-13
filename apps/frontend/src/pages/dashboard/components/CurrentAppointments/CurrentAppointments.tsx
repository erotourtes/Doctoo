import type { TPatient } from '@/dataTypes/Patient';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import { AppointmentStatus, type IAppointment } from '@/dataTypes/Appointment';
import { Role } from '../../../../dataTypes/User';

type AppointmentCardProps = {
  appointments: IAppointment[];
  patients: TPatient[];
};

export default function CurrentAppointments({ appointments, patients }: AppointmentCardProps) {
  return (
    <div className='h-min-[306px] flex w-full flex-col gap-7 rounded-xl bg-white px-2 sm:p-6'>
      <h3 className='text-lg'>Current appointments</h3>
      {appointments?.length > 0 ? (
        appointments
          .filter(a => a.status === AppointmentStatus.PLANNED)
          .slice(0, 1)
          .map(currentAppointment => {
            const appointmentPatient = patients.find(
              (patient: TPatient) => patient.id === currentAppointment.patientId,
            );
            return (
              <AppointmentCard
                appointment={currentAppointment}
                key={currentAppointment.id}
                withQuickNotes={true}
                user={{ data: appointmentPatient!, role: Role.PATIENT }}
                about={currentAppointment.notes}
              />
            );
          })
      ) : (
        <div className='flex flex-col items-center gap-6'>
          <p className='text-center font-normal leading-6'>Seems like you don’t have any appointments.</p>
        </div>
      )}
    </div>
  );
}
