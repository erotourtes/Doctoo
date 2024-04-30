import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { patchPatientData } from '@/app/patient/PatientThunks';
import type { TPatient } from '@/dataTypes/Patient';
import { capitalizeString } from '@/utils/capitalizeString';
import Icon from '@UI/Icon/Icon';
import type { IconVariant } from '@UI/Icon/types';
import { useState } from 'react';

type StatsCardProps = {
  iconVariant: IconVariant;
  value: string;
  variant: 'input' | 'select';
  title: 'Height, cm' | 'Weight, kg' | 'Age' | 'Gender' | 'Blood type';
  options?: string[];
};

const StatsCard = ({ title, iconVariant, value, variant, options }: StatsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const patient = useAppSelector(state => state.patient.data);
  const dispatch = useAppDispatch();

  return (
    <div className='flex w-full justify-between gap-4 rounded-lg bg-white p-3 pb-4 text-start md:p-7'>
      <div className='flex flex-col gap-4'>
        <p className='w-full text-grey-1'>{title}</p>
        <p className='group flex w-fit items-center text-black'>
          <form onSubmit={e => e.preventDefault()}>
            {variant === 'input' && (
              <input
                onBlur={() => {
                  switch (title) {
                    case 'Height, cm':
                      if (parseInt(inputValue)) {
                        dispatch(patchPatientData({ id: patient.id, body: { height: parseInt(inputValue) } }));
                      }

                      break;

                    case 'Weight, kg':
                      if (parseInt(inputValue)) {
                        dispatch(patchPatientData({ id: patient.id, body: { weight: parseInt(inputValue) } }));
                      }

                      break;

                    case 'Age':
                      if (parseInt(inputValue)) {
                        dispatch(patchPatientData({ id: patient.id, body: { age: parseInt(inputValue) } }));
                      }

                      break;
                  }
                }}
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
                    let gender: TPatient['gender'] | null = null;
                    let bloodType: TPatient['bloodType'] | null = null;
                    switch (title) {
                      case 'Gender':
                        switch (inputValue.toLowerCase()) {
                          case 'female':
                            gender = 'FEMALE';
                            break;
                          case 'male':
                            gender = 'MALE';
                            break;
                        }

                        if (gender) dispatch(patchPatientData({ id: patient.id, body: { gender } }));
                        break;
                      case 'Blood type':
                        switch (inputValue.toLowerCase()) {
                          case 'ab-':
                            bloodType = 'AB_MINUS';
                            break;
                          case 'ab+':
                            bloodType = 'AB_PLUS';
                            break;
                          case 'a-':
                            bloodType = 'A_MINUS';
                            break;
                          case 'a+':
                            bloodType = 'A_PLUS';
                            break;
                          case 'b-':
                            bloodType = 'B_MINUS';
                            break;
                          case 'b+':
                            bloodType = 'B_PLUS';
                            break;
                          case 'o-':
                            bloodType = 'O_MINUS';
                            break;
                          case 'o+':
                            bloodType = 'O_PLUS';
                            break;
                        }
                        if (bloodType) dispatch(patchPatientData({ id: patient.id, body: { bloodType } }));
                        break;
                    }
                  }}
                  className={`${isEditing ? 'pointer-events-auto' : 'pointer-events-none'} appearance-none outline-none`}
                >
                  {options &&
                    options.map((option, index) => (
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
