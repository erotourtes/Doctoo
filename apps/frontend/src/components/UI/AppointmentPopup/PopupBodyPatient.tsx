import { ImgAvatarKey } from '@UI/index';
import type { TPatient } from '@/dataTypes/Patient';
import useWindowWide from '@/hooks/useWindowWide';

type PopupBodyPatientProps = {
  patient: TPatient;
  typeAppointment: string;
};

export default function PopupBodyPatient({ patient, typeAppointment }: PopupBodyPatientProps) {
  const mobileWidth = useWindowWide(692);

  const appointmentType =
    typeAppointment.charAt(0).toLocaleUpperCase() + typeAppointment.slice(1).toLocaleLowerCase().replace('_', ' ');

  const { firstName, lastName, avatarKey } = patient;
  const fullName = `${firstName} ${lastName}`;

  function AppointmentWith() {
    return (
      <div className={`flex h-6 flex-row justify-between ${mobileWidth ? 'text-lg' : 'text-sm'}`}>
        <span className={`font-medium text-black`}>
          Appointment with <span className='font-semibold text-main'>{fullName}</span>
        </span>
      </div>
    );
  }

  return (
    <>
      {!mobileWidth && <AppointmentWith />}

      <div className='flex h-32 justify-start gap-x-6'>
        <ImgAvatarKey avatarKey={avatarKey} className='max-h-28 max-w-28 rounded-lg' />

        <div className='flex w-full flex-col gap-3'>
          {mobileWidth && <AppointmentWith />}
          <span className={`font-semibold text-black`}>{appointmentType}</span>
        </div>
      </div>
    </>
  );
}
