import { Button } from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import Icon from '@UI/Icon/Icon';
import Popup from 'reactjs-popup';

type MedicalConditionPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MedicalConditionPopup = ({ isOpen, onClose }: MedicalConditionPopupProps) => {
  return (
    <Popup open={isOpen} onClose={onClose} modal>
      <div className='pointer-events-none fixed left-0 top-0 z-10 h-screen w-screen bg-black/20' />
      <div className='relative z-20 flex h-full min-w-[600px] flex-col gap-7 rounded-xl bg-white p-12'>
        <Icon variant='close' className='absolute right-4 top-4 cursor-pointer' onClick={onClose} />
        <p className='text-2xl font-medium text-black'>Medical condition and allergies </p>
        <form onSubmit={e => e.preventDefault()} className='flex w-full flex-col gap-7'>
          <div className='w-full'>
            <Input label='Medical condition' placeholder='' type='text' className='w-full' />

            <Input label='Allergies' placeholder='' type='text' className='w-full' />
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

export default MedicalConditionPopup;
