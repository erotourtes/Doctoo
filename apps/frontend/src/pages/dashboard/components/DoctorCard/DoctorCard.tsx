import type { IDoctor } from '@/dataTypes/Doctor';
import { useRef, useState } from 'react';

type AppointmentCardProps = {
  doctor: IDoctor;
  classNames: string | undefined;
};

export default function DoctorCard({ doctor, classNames }: AppointmentCardProps) {
  const { specializations } = doctor;
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const checkOverflow = () => {
    const element = textRef.current;
    if (element) {
      if (element.scrollWidth > element.clientWidth) {
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    }
  };

  return (
    <>
      <div className={`${classNames} relative flex w-2/5 flex-row px-[16px] py-[8px]`}>
        <img src={doctor.avatarKey} alt={doctor.firstName} width='48px' height='48px' className='rounded-lg' />
        <div className='ml-[8px] flex w-[197px] min-w-[197px] flex-col'>
          <p className='font-semibold leading-6'>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</p>
          <div
            ref={textRef}
            className='flex w-5/6 overflow-hidden whitespace-nowrap text-sm font-medium leading-5 text-grey-1'
            onMouseEnter={checkOverflow}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {specializations.map(specialization => specialization.name).join(', ')}
          </div>
        </div>
        <div
          className={`absolute left-60 top-12 z-10 w-28 cursor-default rounded bg-black bg-opacity-75 p-2 text-sm text-white transition-all duration-200 ${showTooltip ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
          {specializations.map(specialization => specialization.name).join(', ')}
        </div>
      </div>
    </>
  );
}
