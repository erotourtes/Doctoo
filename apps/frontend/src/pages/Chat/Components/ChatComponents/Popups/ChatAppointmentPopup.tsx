import { PopupDoctoo } from '@/components/UI';
import type { IAppointment } from '@/dataTypes/Appointment';
import AppointmentsPopup from '@/pages/Appointments/Components/AppointmentsPopup/AppointmentsPopup';

type ChatAppointmentPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  appointment: IAppointment | null;
};

const ChatAppointmentPopup = ({ isOpen, onClose, appointment }: ChatAppointmentPopupProps) => {
  return (
    <PopupDoctoo
      popupIsOpen={isOpen}
      closePopup={onClose}
      modalFullClassName='max-w-[700px]'
      modalBodyClassName='relative z-20 flex h-full flex-col gap-3 rounded-xl bg-white'
    >
      {appointment && <AppointmentsPopup appointment={appointment!} reviews={[]} />}
    </PopupDoctoo>
  );
};

export default ChatAppointmentPopup;
