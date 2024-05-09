import { useEffect, useState } from 'react';
import FHIR from 'fhirclient';

interface ObservationEntry {
  resource: {
    effectiveDateTime: string;
    valueQuantity: {
      value: number;
    };
  };
}

interface ApiResponse {
  entry: ObservationEntry[];
}

const HealthData = () => {
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    async function authorizeAndFetchData() {
      const client: any = await FHIR.oauth2.ready();
      fetchData(client);
    }

    async function fetchData(client: any) {
      const loincs = [encodeURIComponent('http://loinc.org|4548-4')];
      const response = await fetch(
        `${client.state.serverUrl}/Observation?patient=${client.patient.id}&limit=50&code=${loincs.join(',')}`,
        {
          headers: {
            Accept: 'application/json+fhir',
            Authorization: `Bearer ${client.state.tokenResponse.access_token}`,
          },
        },
      );

      const data: ApiResponse = await response.json();

      if (data.entry && data.entry.length > 0) {
        const firstEntry = data.entry[0];
        console.log(firstEntry, client);
        setResult(`Your HgA1C was tested on ${firstEntry.resource.effectiveDateTime}<br/><br/>
          Your HgA1C was ${firstEntry.resource.valueQuantity.value}<br/><br/>
          <a href='https://en.wikipedia.org/wiki/Glycated_hemoglobin'>According to Wikipedia</a>, A1c is measured primarily to determine the three-month average blood sugar level and can be used as a diagnostic test for diabetes mellitus. <5.7% Normal, 5.7-6.4% Prediabetes, >6.5% Diabetes.`);
      } else {
        setResult('No HgA1C data found.');
      }
    }

    authorizeAndFetchData();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: result }} />;
};

export default HealthData;
