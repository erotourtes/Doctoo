import type { IDoctor } from '@/dataTypes/Doctor';
import DoctorsListItem from './DoctorsListItem';
import type { IAppointment } from '@/dataTypes/Appointment';

interface DoctorsListProps {
  doctors: IDoctor[];
  chosenOptions: string[];
  appointments: IAppointment[];
}

const DoctorsList = ({ doctors, appointments, chosenOptions }: DoctorsListProps) => {
  const filterdDoctors = () => {
    const result: IDoctor[] = [];
    chosenOptions.forEach(option => {
      doctors.forEach(doctor => {
        if (doctor.id === option) {
          result.push(doctor);
        }
      });
    });
    return result;
  };

  const doctorsList = chosenOptions.length ? filterdDoctors() : doctors;

  return (
    <>
      <div className='flex flex-col gap-6'>
        {doctors && (
          <div className=''>
            <h3 className='mb-4 flex justify-start text-lg font-medium text-black'>
              My doctors ({doctorsList.length})
            </h3>
            <div className='flex flex-col gap-4'>
              {doctorsList.map(doctor => (
                <DoctorsListItem key={doctor.id} doctor={doctor} appointments={appointments} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorsList;
