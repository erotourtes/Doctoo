import { useEffect, useState } from 'react';
import FHIR from 'fhirclient';

interface ApiResponse {
  entry: any;
}

const HealthData = () => {
  const [result, setResult] = useState<string>('');

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

      const patientAllergiesLionics = [encodeURIComponent('http://loinc.org|8601-7')];

      const AllergyIntoleranceResponse = await fetch(
        client.state.serverUrl.serverUrl +
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

      const AllergiesResponse = await AllergyIntoleranceResponse.json();
      console.log('Allergies: ', AllergiesResponse.entry[0].resource.code.coding[0].display);

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

      setResult('Observation: ');
      const obsResponse = await Observation.json();

      console.log('Wheight: ', obsResponse.entry[0].resource.valueQuantity.value);
    }

    authorizeAndFetchData();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: result }} />;
};

export default HealthData;
