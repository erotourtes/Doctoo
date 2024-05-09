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
          client_id: '6203c6e4-9e73-4af5-ab6b-a212614d2bd4',
          scope:
            'PATIENT.READ PATIENT.SEARCH, OBSERVATION.SEARCH, OBSERVATION.READ ALLERGYINTOLERANCE.SEARCH, CONDITION.SEARCH',
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
