import { useEffect } from 'react';
import OptionalSelect from '../../../components/UI/Select/OptionalSelect';
import { getSpecializationsList } from '../../../app/specialization/SpecializationThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { specializationsList } from '../../../app/specialization/SpecializationSlice';
import { Tag } from '../../../components/UI';
import { getAllHospitals } from '../../../app/hospital/HospitalThunks';

export type DoctorFilters = {
  hospitalId?: string[];
  specializationId?: string[];
};

export const Filters = ({
  filters,
  setFilters,
}: {
  filters: DoctorFilters;
  setFilters: (filters: DoctorFilters) => void;
}) => {
  const dispatch = useAppDispatch();
  const specializations = useAppSelector(specializationsList);
  const hospitals = useAppSelector(state => state.hospital.data);
  useEffect(() => {
    dispatch(getSpecializationsList());
    dispatch(getAllHospitals());
  }, []);
  return (
    <div className='mt-2'>
      <div className='flex gap-1'>
        <OptionalSelect
          options={specializations}
          defaultOption='All doctors'
          setChosenOptions={selected => setFilters({ ...filters, specializationId: selected })}
          selectedOptions={filters.specializationId}
        />
        <OptionalSelect
          options={hospitals}
          defaultOption='All hospitals'
          setChosenOptions={selected => setFilters({ ...filters, hospitalId: selected })}
          selectedOptions={filters.hospitalId}
        />
      </div>
      <div className='mt-2 space-x-1 space-y-1'>
        {filters.hospitalId?.length
          ? filters.hospitalId?.map(id => {
              const hospital = hospitals.find(h => h.id === id);
              return (
                <Tag
                  icon
                  text={hospital!.name}
                  key={hospital?.id}
                  onClick={() => setFilters({ ...filters, hospitalId: filters.hospitalId?.filter(h => h !== id) })}
                />
              );
            })
          : null}
        {filters.specializationId?.length
          ? filters.specializationId?.map(id => {
              const specialization = specializations.find(h => h.id === id);
              return (
                <Tag
                  icon
                  text={specialization!.name}
                  key={specialization?.id}
                  onClick={() =>
                    setFilters({ ...filters, specializationId: filters.specializationId?.filter(h => h !== id) })
                  }
                />
              );
            })
          : null}
        {filters.hospitalId?.length || filters.specializationId?.length ? (
          <button onClick={() => setFilters({})}>
            Clear all filters ({(filters.hospitalId?.length || 0) + (filters.specializationId?.length || 0)})
          </button>
        ) : null}
      </div>
    </div>
  );
};