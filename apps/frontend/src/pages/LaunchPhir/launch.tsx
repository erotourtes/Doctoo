import { useEffect } from 'react';
import FHIR from 'fhirclient';
import { Spinner } from '../../components/UI';

const LaunchPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/node_modules/fhirclient/build/fhir-client.js';
    script.async = true;
    script.onload = () => {
      if (FHIR) {
        console.log('FHIR client loaded, authorizing with FHIR');

        FHIR.oauth2.authorize({
          client_id: '586f2d92-d53b-49f3-8b7f-c986c04fdbff',
          scope: 'PATIENT.READ, PATIENT.SEARCH, OBSERVATION.READ, OBSERVATION.SEARCH',
          redirect_uri: 'https://doctoo.org/health',
          iss: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4',
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='flex  items-center justify-center'>
      <Spinner size={200} color='#089BAB' />
    </div>
  );
};

export default LaunchPage;
