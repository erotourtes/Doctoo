import OptionalSelect from '@/components/UI/Select/OptionalSelect';
import { useEffect, useState } from 'react';
import type { IDoctor } from '@/dataTypes/Doctor';

interface MyDoctorsFilterProps {
  doctors: IDoctor[];
  chosenOptions: string[];
  setChosenOptions: (value: string[]) => void;
}

const MyDoctorsFilters = ({ doctors, chosenOptions, setChosenOptions }: MyDoctorsFilterProps) => {
  const [options, setOptions] = useState<
    {
      id: string;
      name: string;
    }[]
  >(doctors.map(doctor => ({ name: `${doctor.firstName} ${doctor.lastName}`, id: doctor.id })));
  useEffect(() => {
    setOptions(doctors.map(doctor => ({ name: `${doctor.firstName} ${doctor.lastName}`, id: doctor.id })));
  }, [doctors, chosenOptions]);

  return (
    <div>
      <OptionalSelect options={options} defaultOption='All doctors' setChosenOptions={setChosenOptions} />
    </div>
  );
};

export default MyDoctorsFilters;
