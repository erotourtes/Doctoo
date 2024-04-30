import { useAppDispatch } from '@/app/hooks';
import { logoutPatient } from '@/app/patient/PatientThunks';
import { Button } from '@/components/UI';
import { useNavigate } from 'react-router';

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutPatient());

    navigate('/login', { replace: true });
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-6'>Are you sure?</h1>

        <Button onClick={logout} type='primary'>
          Yes
        </Button>
      </div>
    </div>
  );
};

export default Logout;
