import { useEffect } from 'react';
import FHIR from 'fhirclient';

interface ApiResponse {
  entry: any;
}

const HealthData = () => {
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
    }

    authorizeAndFetchData();
  }, []);
  return <div>Sup</div>;
};

export default HealthData;
