import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import Icon from '@UI/Icon/Icon';
import Popup from 'reactjs-popup';

type PersonalInfoPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PersonalInfoPopup = ({ isOpen, onClose }: PersonalInfoPopupProps) => {
  const patient = useAppSelector(state => state.patient.data);
  return (
    <Popup open={isOpen} modal onClose={onClose}>
      <div className='pointer-events-none fixed left-0 top-0 z-10 h-screen w-screen bg-black/20' />
      <div className='p-relative z-20 flex h-full min-w-[500px] flex-col gap-7 rounded-xl bg-white p-12'>
        <Icon variant='close' className='absolute right-4 top-4 cursor-pointer' onClick={onClose} />
        <p className='text-2xl font-medium text-black'>Personal info</p>
        <div className='flex items-center gap-7'>
          {patient.avatarKey && (
            <>
              <img src={patient.avatarKey} alt='avatar' className='h-[92px] w-[92px] rounded-lg' />
              <div className='flex gap-7'>
                <button className='flex gap-2 font-medium text-main'>
                  <Icon variant='change' />
                  Change photo
                </button>
                <button className='flex gap-2 font-medium text-black'>
                  <Icon variant='delete' />
                  Delete photo
                </button>
              </div>
            </>
          )}
          {!patient.avatarKey && (
            <>
              <div className='flex h-[92px] w-[92px] items-center justify-center rounded-lg bg-background text-main'>
                <Icon variant='account' className='h-12 w-12' />
              </div>
              <button className='cursor-pointer font-medium text-main'>Upload photo</button>
            </>
          )}
        </div>
        <form onSubmit={e => e.preventDefault()} className='flex w-full flex-col gap-7'>
          <div className='w-full'>
            <Input id='name' label='Name and surname' placeholder='John Smith' type='text' className='w-full' />

            <Input id='email' label='Email' placeholder='john.smith@gmail.com' type='text' className='w-full' />

            <div className='flex w-full'>
              {/* TODO: Add select input after it's ready */}
              <Input id='phone' label='Phone' placeholder='060 612 12 07' type='text' className='w-full' />
            </div>
          </div>
          <div className='flex w-full gap-4'>
            <Button type='secondary' onClick={() => {}} className='w-1/2'>
              Cancel
            </Button>
            <Button type='primary' onClick={() => {}} className='w-1/2'>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default PersonalInfoPopup;
