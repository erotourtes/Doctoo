import { useEffect } from 'react';
import Navigation from './pages/PageContainer';
import { useAppDispatch } from './app/hooks';
import { getAppointmentsByPatientId } from './app/appointment/AppointmentThunks';
import { getConditionData } from './app/condition/ConditionThunks';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAppointmentsByPatientId('7'));
    dispatch(getConditionData());
  }, [dispatch]);

  return <Navigation />;
};

export default App;
