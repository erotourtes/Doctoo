import MyDoctorCard from './Card/MyDoctorCard';
import type { IDoctor } from '@/dataTypes/Doctor';

interface DoctorsListProps {
  doctors: IDoctor[];
  chosenOptions: string[];
}

const DoctorsList = ({ doctors, chosenOptions }: DoctorsListProps) => {
  console.log(doctors);

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
    <div className='flex flex-col gap-6'>
      {doctors && (
        <div className=''>
          <h3 className='mb-4 flex justify-start text-lg font-medium text-black'>My doctors ({doctorsList.length})</h3>
          <div className='flex flex-col gap-4'>
            {doctorsList.map(doctor => (
              <MyDoctorCard
                key={Math.random()}
                avatarKey={doctor.avatarKey}
                name={doctor.firstName + ' ' + doctor.lastName}
                specializations={doctor.specializations}
                tags={['Best Doctor']}
                reviewsNumber={0}
                rating={0}
                variant={'withBookButton'}
                bookPrice={doctor.payrate}
                about={doctor.about}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
