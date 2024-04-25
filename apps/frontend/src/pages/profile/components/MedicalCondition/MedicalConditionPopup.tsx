import { Button } from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import PopupDoctoo from '@/components/UI/Popup/Popup';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { type FieldValues, FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

type MedicalConditionPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface FormData {
  condtion: string;
  allergies: string;
}

const schema = Joi.object({
  condition: Joi.string().alphanum().min(3).max(30).required(),
  allergies: Joi.string().required(),
});

const MedicalConditionPopup = ({ isOpen, onClose }: MedicalConditionPopupProps) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });

  const { handleSubmit } = methods;

  function onSubmit(data: FormData): void {
    console.log(data);
  }

  return (
    <PopupDoctoo
      popupIsOpen={isOpen}
      closePopup={onClose}
      modalBodyClassName='relative z-20 flex h-full min-w-[600px] flex-col gap-7 rounded-xl bg-white'
    >
      <p className='text-2xl font-medium text-black'>Medical condition and allergies </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className='flex w-full flex-col gap-7'>
          <div className='w-full'>
            <Input id='condition' label='Medical condition' type='text' className='w-full' />

            <Input id='allergies' label='Allergies' type='text' className='w-full' />
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
      </FormProvider>
    </PopupDoctoo>
  );
};

export default MedicalConditionPopup;
