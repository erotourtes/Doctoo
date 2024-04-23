import { useAppDispatch } from '@/app/hooks';
import { patchPatientData } from '@/app/patient/PatientThunks';
import { BloodType, Gender } from '@/dataTypes/Patient';
import { capitalizeString } from '@/utils/capitalizeString';
import Icon from '@UI/Icon/Icon';
import type { IconVariant } from '@UI/Icon/types';
import { useState } from 'react';

type StatsCardProps = {
  iconVariant: IconVariant;
  value: string;
} & (
  | { variant: 'input'; title: 'Height,cm' | 'Weight,kg' | 'Age'; options?: never }
  | { variant: 'select'; title: 'Gender' | 'Blood type'; options: string[] }
);

const StatsCard = ({ title, iconVariant, value, variant, options }: StatsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const dispatch = useAppDispatch();

  return (
    <div className='flex w-full justify-between gap-4 rounded-lg bg-white p-7 pb-4 text-start'>
      <div className='flex flex-col gap-4'>
        <p className='w-full text-grey-1'>{title}</p>
        <p className='group flex w-fit items-center  text-black'>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log('submit');
            }}
          >
            {variant === 'input' && (
              <input
                className={`w-fit bg-white font-medium outline-none`}
                disabled={!isEditing}
                defaultValue={value}
                size={1}
                onChange={e => setInputValue(e.target.value)}
              />
            )}
            {variant === 'select' && (
              <form>
                <select
                  onChange={e => {
                    setInputValue(e.target.value);
                    setIsEditing(false);
                    switch (title) {
                      case 'Gender':
                        const gender = inputValue;
                        if (gender.toLowerCase() === Gender.FEMALE) {
                          dispatch(patchPatientData({ gender: Gender.FEMALE }));
                        }
                        if (gender.toLowerCase() === Gender.MALE) {
                          dispatch(patchPatientData({ gender: Gender.MALE }));
                        }
                        break;
                      case 'Blood type':
                        const bloodType = inputValue;
                        switch (bloodType) {
                          case BloodType.AB_MINUS:
                            dispatch(patchPatientData({ bloodType: BloodType.AB_MINUS }));
                            break;
                          case BloodType.AB_PLUS:
                            dispatch(patchPatientData({ bloodType: BloodType.AB_PLUS }));
                            break;
                          case BloodType.A_MINUS:
                            dispatch(patchPatientData({ bloodType: BloodType.A_MINUS }));
                            break;
                          case BloodType.A_PLUS:
                            dispatch(patchPatientData({ bloodType: BloodType.A_PLUS }));
                            break;
                          case BloodType.B_MINUS:
                            dispatch(patchPatientData({ bloodType: BloodType.B_MINUS }));
                            break;
                          case BloodType.B_PLUS:
                            dispatch(patchPatientData({ bloodType: BloodType.B_PLUS }));
                            break;
                          case BloodType.O_MINUS:
                            dispatch(patchPatientData({ bloodType: BloodType.O_MINUS }));
                            break;
                          case BloodType.O_PLUS:
                            dispatch(patchPatientData({ bloodType: BloodType.O_PLUS }));
                            break;
                        }
                        break;
                    }
                  }}
                  className={`${isEditing ? 'pointer-events-auto' : 'pointer-events-none'} appearance-none outline-none`}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {capitalizeString(option)}
                    </option>
                  ))}
                </select>
              </form>
            )}
          </form>
          <Icon
            onClick={() => setIsEditing(!isEditing)}
            variant='edit'
            className='cursor-pointer text-lg text-grey-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          />
        </p>
      </div>
      <div className='h-fit rounded-lg bg-background p-2 text-grey-1 '>
        <Icon variant={iconVariant} className='h-7 w-7' />
      </div>
    </div>
  );
};

export default StatsCard;
