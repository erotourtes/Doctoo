import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authorizePatient } from '../../app/patient/PatientThunks';

const ProtectPatientRoute: React.FC<{ Page?: React.ElementType }> = ({ Page }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFetched = useAppSelector(state => state.patient.state.isFetched);
  const isLoading = useAppSelector(state => state.patient.state.isLoading);
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  React.useEffect(() => {
    if (isFetched) return;
    dispatch(authorizePatient());
  }, []);

  React.useEffect(() => {
    if (isFirstRender) return void setIsFirstRender(false);
    if (isLoading || isFetched) return;
    navigate('/signup', { replace: true });
  }, [isFetched, isLoading]);

  if (isFetched) return Page ? <Page /> : <Outlet />;
  return 'Loading...';
};

export default ProtectPatientRoute;
