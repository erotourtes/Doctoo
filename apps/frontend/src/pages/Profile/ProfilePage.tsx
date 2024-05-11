import PageHeader from '../PageHeader';
import StatsCard from './components/StatsCard/StatsCard';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import MedicalCondition from './components/MedicalCondition/MedicalCondition';
import AddressInfo from './components/AddressInfo/AddressInfo';
import PaymentMethods from './components/PaymentMethods/PaymentMethods';
import { capitalizeString } from '@/utils/capitalizeString';
import { useEffect } from 'react';
import { getAllConditions } from '@/app/condition/ConditionThunks';
import { getAllAllergies } from '@/app/allergy/AllergyThunks';
import { getPatientData, patchPatientData, patchUserData } from '@/app/patient/PatientThunks';

import { Link } from 'react-router-dom';
import FHIR from 'fhirclient';
import { fetchObservationData, fetchPatientData } from '../../app/fhir/FhirThunks';

const ProfilePage = () => {
  const patient = useAppSelector(state => state.patient.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPatientData(patient.id));
    dispatch(getAllConditions());
    dispatch(getAllAllergies());
  }, []);

  useEffect(() => {
    async function authorizeAndFetchData() {
      const client: any = await FHIR.oauth2.ready();
      if (!client.state.tokenResponse.access_token) return;
      const storedPatientId = localStorage.getItem('lastFetchedPatientId');

      if (client.patient.id === storedPatientId) {
        console.log('Skipping data fetch for the same patient ID');
        return;
      }
      console.log('Fetching data for a new patient ID');

      fetchData(client);

      localStorage.setItem('lastFetchedPatientId', client.patient.id);
    }

    async function fetchData(client: any) {
      const FetchParams = {
        serverUrl: client.state.serverUrl,
        token: client.state.tokenResponse.access_token,
        patientId: client.patient.id,
      };

      const patientDataResponse = await fetchPatientData(FetchParams);

      const observationDataResponse = await fetchObservationData(FetchParams);

      if (!patientDataResponse.data || !observationDataResponse.data) {
        console.error('Failed to fetch data');
        return;
      }

      const patientResource = patientDataResponse.data.entry[0].resource;

      const age = new Date().getFullYear() - new Date(patientResource.birthDate).getFullYear();

      dispatch(
        patchUserData({
          userId: patient.userId,
          patientId: patient.id,
          data: {
            firstName: patientResource.name[0].given[0],
            lastName: patientResource.name[0].family,
          },
        }),
      );

      dispatch(
        patchPatientData({
          id: patient.id,
          body: {
            city: patientResource.address[0].city,
            street: patientResource.address[0].line[0],
            apartment: patientResource.address[0].line[1],
            state: patientResource.address[0].district,
            gender: patientResource.gender.toUpperCase(),
            age: age,
            weight: observationDataResponse.data.entry[0].resource.valueQuantity.value,
          },
        }),
      );
    }

    authorizeAndFetchData();
  }, []);

  return (
    <div>
      <div className='md:grid lg:flex'>
        <PageHeader iconVariant='account' title='Profile' />
        <Link to='/launch' className='hover:text-main sm:text-wrap lg:text-nowrap'>
          Are you a patient at an Epic System? Login here.
        </Link>
      </div>
      <section className='flex w-full flex-col gap-7 overflow-y-auto bg-background pt-7 lg:flex-row lg:gap-3 xl:gap-7'>
        <div className='flex w-full flex-col gap-7'>
          <PersonalInfo />
          <MedicalCondition />
          <PaymentMethods />
          <AddressInfo />
        </div>

        <div className='flex w-full flex-col gap-7 lg:max-w-[200px]'>
          <StatsCard variant='input' title='Height, cm' value={patient.height.toString()} iconVariant='height' />

          <StatsCard variant='input' title='Weight, kg' value={patient.weight.toString()} iconVariant='weight' />

          <StatsCard variant='input' title='Age' value={patient.age.toString()} iconVariant='age' />

          <StatsCard
            variant='select'
            options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
            title='Blood type'
            value={patient.bloodType.toString()}
            iconVariant='blood-type'
          />

          <StatsCard
            variant='select'
            title='Gender'
            value={capitalizeString(patient.gender)}
            iconVariant='gender'
            options={['male', 'female']}
          />
        </div>
      </section>
    </div>
  );
};
export default ProfilePage;
