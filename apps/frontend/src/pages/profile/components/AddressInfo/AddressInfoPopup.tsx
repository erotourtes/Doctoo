import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { patchPatientData } from '@/app/patient/PatientThunks';
import { PopupDoctoo, Input, Button } from '@/components/UI';
import type { IPatient } from '@/dataTypes/Patient';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { type FieldValues, FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

type AddressInfoPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface FormData {
  country: string;
  city: string;
  street: string;
  apartment: string;
  zipCode?: string;
}

const schema = Joi.object({
  country: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(3).max(30).required(),
  street: Joi.string().min(3).max(30).required(),
  zipCode: Joi.string().alphanum().min(3).max(30).required(),
  apartment: Joi.string().max(30).optional(),
});

const AddressInfoPopup = ({ isOpen, onClose }: AddressInfoPopupProps) => {
  const patient = useAppSelector(state => state.patient.data);

  const methods = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { handleSubmit } = methods;

  function onSubmit(data: FormData): void {
    console.log(data);
    const patientData: Partial<IPatient> = {
      ...data,
    };
    dispatch(patchPatientData({ id: patient.id, data: patientData }));
  }

  return (
    <PopupDoctoo
      popupIsOpen={isOpen}
      closePopup={onClose}
      modalFullClassName='max-w-[508px]'
      modalBodyClassName=' relative z-20 flex h-full max-w-[412px] flex-col gap-7 rounded-xl bg-white'
    >
      <p className='text-2xl font-medium text-black'>Add a new address</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className='flex w-full flex-col gap-7'>
          <div className='grid w-full gap-2 sm:gap-6'>
            <Input id='country' label='Country' type='text' className='w-full' />
            <Input id='city' label='City' type='text' className='w-full' />
            <Input id='street' label='Street' type='text' className='w-full' />

            <div className='flex w-full flex-col gap-4 sm:flex-row'>
              <Input id='apartment' label='Apartment (optional)' type='text' className='w-full' />
              <Input id='zipCode' label='Zip code' type='text' className='w-full' />
            </div>
          </div>

          <div className='flex w-full flex-col-reverse gap-4 sm:flex-row'>
            <Button btnType='reset' type='secondary' onClick={() => {}} className='w-full sm:w-1/2'>
              Cancel
            </Button>
            <Button btnType='submit' type='primary' onClick={() => {}} className='w-full sm:w-1/2'>
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </PopupDoctoo>
  );
};

export default AddressInfoPopup;
