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
      console.log(client);
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
      console.log(patientData);
      if (
        patientData &&
        patientData.entry &&
        patientData.entry[0] &&
        patientData.entry[0].resource &&
        patientData.entry[0].resource.address
      ) {
        setResult(patientData.entry[0].resource.address[0]); // Assuming the first address is what you need
      } else {
        setResult('No address found');
      }

      console.log(result);
    }

    authorizeAndFetchData();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: result }} />;
};

export default HealthData;
