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

interface ApiResponse {
  entry: any;
}

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
      const loincs = [encodeURIComponent('http://loinc.org|2106-3')];
      const patientResponse = await fetch(
        `${client.state.serverUrl}/Patient?patient=${client.patient.id}&limit=50&code=${loincs.join(',')}`,
        {
          headers: {
            Accept: 'application/json+fhir',
            Authorization: `Bearer ${client.state.tokenResponse.access_token}`,
          },
        },
      );

      const patientData: ApiResponse = await patientResponse.json();

      console.log(patientData.entry[0].resource);

      dispatch(
        patchUserData({ id: patient.userId, data: { firstName: patientData.entry[0].resource.name[0].given[0] } }),
      );

      dispatch(patchUserData({ id: patient.userId, data: { lastName: patientData.entry[0].resource.name[0].family } }));
      console.log('Patient: ', patientData.entry[0].resource.name[0].given[0]);
      console.log('Patient: ', patientData.entry[0].resource.name[0].family);

      const patientAllergiesLionics = [encodeURIComponent('http://loinc.org|8601-7')];

      const AllergyIntoleranceResponse = await fetch(
        client.state.serverUrl +
          '/AllergyIntolerance?clinical-status=active&patient=' +
          client.patient.id +
          '&limit=50&code=' +
          patientAllergiesLionics.join(','),
        {
          headers: {
            Accept: 'application/json+fhir',
            Authorization: 'Bearer ' + client.state.tokenResponse.access_token,
          },
        },
      ).then(function (data) {
        return data;
      });

      const Conditions = await fetch(
        client.state.serverUrl +
          '/Condition?clinical-status=active,inactive,resolved&patient=' +
          client.patient.id +
          '&category=problem-list-item',
        {
          headers: {
            Accept: 'application/json+fhir',
            Authorization: 'Bearer ' + client.state.tokenResponse.access_token,
          },
        },
      ).then(function (data) {
        return data;
      });

      const ConditionsResponse = await Conditions.json();

      console.log('Conditions: ', ConditionsResponse.entry[0].resource.code.coding[0].display);

      const Observation = await fetch(
        client.state.serverUrl +
          '/Observation?patient=' +
          client.patient.id +
          '&subject=' +
          client.patient.id +
          '&category=vital-signs&code=29463-7&date=2021-01-01',
        {
          headers: {
            Accept: 'application/json+fhir',
            Authorization: 'Bearer ' + client.state.tokenResponse.access_token,
          },
        },
      );

      const ObservationResponse = await Observation.json();

      console.log('Observation: ', ObservationResponse.entry[0].resource.valueQuantity.value);

      const AllergiesResponse = await AllergyIntoleranceResponse.json();
      console.log('Allergies: ', AllergiesResponse.entry[0].resource.code.coding[0].display);
    }

    authorizeAndFetchData();
  }, []);

  return (
    <div>
      <div>
        <PageHeader iconVariant='account' title='Profil' />
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
