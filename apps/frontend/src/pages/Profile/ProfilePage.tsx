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
import { getPatientData, patchUserData } from '@/app/patient/PatientThunks';

import { Link } from 'react-router-dom';
import FHIR from 'fhirclient';
import { fetchAllergies, fetchConditions, fetchObservations, fetchPatientData } from '../LaunchPhir/FhirThunks';

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
      fetchData(client);
    }

    async function fetchData(client: any) {
      const patientData = await fetchPatientData(
        client.state.serverUrl,
        client.patient.id,
        client.state.tokenResponse.access_token,
      );

      const patientResource = patientData.entry[0].resource;

      const allergyData = await fetchAllergies(
        client.state.serverUrl,
        client.patient.id,
        client.state.tokenResponse.access_token,
      );

      console.log(allergyData);

      const conditionData = await fetchConditions(
        client.state.serverUrl,
        client.patient.id,
        client.state.tokenResponse.access_token,
      );

      console.log(conditionData);
      const observationData = await fetchObservations(
        client.state.serverUrl,
        client.patient.id,
        client.state.tokenResponse.access_token,
      );

      console.log(observationData);

      dispatch(
        patchUserData({
          id: patient.userId,
          data: {
            firstName: patientResource.name[0].given[0],
            lastName: patientResource.name[0].family,
          },
        }),
      );
    }

    authorizeAndFetchData();
  }, []);

  return (
    <div>
      <div>
        <PageHeader iconVariant='account' title='Profi' />
        <Link to='/launch'>Epic Login</Link>
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
