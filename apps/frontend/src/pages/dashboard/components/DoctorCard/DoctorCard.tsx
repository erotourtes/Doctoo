import type { IDoctor } from '@/dataTypes/Doctor';

type AppointmentCardProps = {
  doctor: IDoctor;
  classNames: string | undefined;
};

export default function DoctorCard({ doctor, classNames }: AppointmentCardProps) {
  return (
    <>
      <div className={`${classNames} flex w-2/5 flex-row px-[16px] py-[8px]`}>
        <img src={doctor.avatarKey} alt={doctor.firstName} width='48px' height='48px' className='rounded-lg' />
        <div className='ml-[8px] flex w-[197px] min-w-[197px] flex-col'>
          <p className='font-semibold leading-6'>{'Dr. ' + doctor.firstName + ' ' + doctor.lastName}</p>
          <p className='text-sm font-medium leading-5 text-[#707D7E]'>{doctor.about}</p>
        </div>
      </div>
    </>
  );
}
