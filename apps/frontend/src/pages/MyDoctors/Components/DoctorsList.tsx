import type { IDoctor } from '@/dataTypes/Doctor';
import DoctorsListItem from './DoctorsListItem';
import type { IAppointment } from '@/dataTypes/Appointment';
import { useEffect, useState } from 'react';
import type { FilterState } from './Filters/filterReducer';
import { filterConfig } from './Filters/MyDoctorsFilters';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getFamilyDoctor } from '@/app/doctor/DoctorThunks';

interface DoctorsListProps {
  doctors: IDoctor[];
  appointments: IAppointment[];
  filters: FilterState;
}

function filterDoctors(doctor: IDoctor, filters: FilterState): boolean {
  if (!doctor) return false;

  const fullName = `Dr. ${doctor!.firstName} ${doctor!.lastName}`;
  const passesDoctorFilter =
    filters.doctors.includes(filterConfig.doctors.defaultValue) || filters.doctors.includes(fullName);

  if (!doctor.specializations?.length) return passesDoctorFilter;

  const doctorSpecialization = doctor.specializations[0].name;
  const doctorHospital = doctor.hospitals[0].name;

  const passesSpecializationFilter =
    filters.specializations.includes(filterConfig.specializations.defaultValue) ||
    filters.specializations.includes(doctorSpecialization);

  const passesHospitalsFilter =
    filters.hospitals.includes(filterConfig.hospitals.defaultValue) || filters.hospitals.includes(doctorHospital);

  return passesSpecializationFilter && passesHospitalsFilter && passesDoctorFilter;
}

const DoctorsList = ({ filters, doctors, appointments }: DoctorsListProps) => {
  const [filteredDoctors, setFilteredDoctors] = useState<IDoctor[]>([]);

  useEffect(() => {
    const filtered = doctors.filter(app => filterDoctors(app, filters));

    setFilteredDoctors(filtered);
  }, [doctors, filters]);

  const patient = useAppSelector(state => state.patient.data);
  const familyDoctor = useAppSelector(state => state.doctor.familyDoctor);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFamilyDoctor(patient.id));
  }, []);

  return (
    <>
      <div className='flex flex-col gap-6'>
        {familyDoctor && (
          <div className=''>
            <h3 className='mb-4 flex justify-start text-lg font-medium text-black'>Family Doctor</h3>
            <div className='flex flex-col gap-4'>
              <DoctorsListItem key={familyDoctor.id} doctor={familyDoctor} appointments={appointments} />
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-6'>
        {doctors && (
          <div className=''>
            <h3 className='mb-4 flex justify-start text-lg font-medium text-black'>
              My doctors ({filteredDoctors.length})
            </h3>
            <div className='flex flex-col gap-4'>
              {filteredDoctors.map(doctor => (
                <DoctorsListItem key={doctor.id} doctor={doctor} appointments={appointments} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorsList;
