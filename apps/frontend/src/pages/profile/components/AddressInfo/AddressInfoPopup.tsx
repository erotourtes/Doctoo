import { Button } from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import Icon from '@UI/Icon/Icon';
import Popup from 'reactjs-popup';

type AddressInfoPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddressInfoPopup = ({ isOpen, onClose }: AddressInfoPopupProps) => {
  return (
    <Popup open={isOpen} onClose={onClose} modal>
      <div className='pointer-events-none fixed left-0 top-0 z-10 h-screen w-screen bg-black/20' />
      <div className='p- relative z-20 flex h-full min-w-[500px] flex-col gap-7 rounded-xl bg-white p-12'>
        <Icon variant='close' className='absolute right-4 top-4 cursor-pointer' onClick={onClose} />

        <p className='text-2xl font-medium text-black'>Add a new address</p>
        <form onSubmit={e => e.preventDefault()} className='flex w-full flex-col gap-7'>
          <div className='w-full'>
            <Input id='country' label='Country' placeholder='' type='text' className='w-full' />

            <Input id='city' label='City' placeholder='' type='text' className='w-full' />

            <Input id='street' label='Street' placeholder='' type='text' className='w-full' />

            <div className='flex w-full gap-4'>
              <Input id='apartment' label='Apartment (optional)' placeholder='' type='text' className='w-full' />

              <Input id='zip' label='Zip code' placeholder='' type='text' className='w-full' />
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

export default AddressInfoPopup;
