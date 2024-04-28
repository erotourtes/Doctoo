import { Button } from '@/components/UI';
import { useAppDispatch } from '@/app/hooks';
import { logoutPatient } from '@/app/patient/PatientThunks';
import { useNavigate } from 'react-router';

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutPatient());
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <h2 className='mb-6'>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <Button onClick={logout} type={'primary'}>
        Confirm Logout
      </Button>
    </div>
  );
};

export default Logout;
