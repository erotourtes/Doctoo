import Icon from '@/components/icons/Icon';
import { useEffect } from 'react';
import Popup from 'reactjs-popup';

type AppointmentPopupProps = {
  popupIsOpen: boolean;
  closePopup: () => void;
  bodyClassName: string;
  bodyChildren: React.ReactNode;
};

export default function PopupDoctoo({ popupIsOpen, closePopup, bodyClassName, bodyChildren }: AppointmentPopupProps) {
  useEffect(() => {
    if (popupIsOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [popupIsOpen]);

  return (
    <Popup open={popupIsOpen} onClose={closePopup}>
      <div className='flex h-screen w-screen bg-black opacity-20' onClick={closePopup}></div>

      <article className='absolute left-1/4 top-1/4 flex h-2/4 w-3/4 max-w-[700px] flex-col justify-between rounded-xl bg-white p-12'>
        {/* Close icon */}
        <div className='-m-8 self-end'>
          <Icon variant='close' onClick={closePopup} className='cursor-pointer  text-grey-1' />
        </div>

        {/* Body */}
        <div className={bodyClassName}>{bodyChildren}</div>
      </article>
    </Popup>
  );
}
