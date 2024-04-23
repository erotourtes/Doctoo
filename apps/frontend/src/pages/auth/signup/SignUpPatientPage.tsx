import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../../components/UI/Button/Button';
import { instance } from '../../../api/axios.api';

const SignUpPatientPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token');
  if (!token) {
    alert('Token is required');
    return null;
  }
  return <SignUpPageOrig token={token} />;
};

const SignUpPageOrig = ({ token }: { token: string }) => {
  const navigate = useNavigate();

  const onSubmit = async () => {
    const res = await instance.post(`/auth/signup/patient/${token}`, {
      weight: 70,
      height: 180,
      age: 20,
      bloodType: 'O_PLUS',
      gender: 'MALE',
      country: 'Ukraine',
      city: 'Kyiv',
      street: 'Khreshchatyk',
    });

    if (res.status === 201) {
      navigate('/');
    }

    console.log(res);
  };

  return (
    <div>
      <Button onClick={onSubmit} type='primary'>
        Sign Up (Mock)
      </Button>
    </div>
  );
};

export default SignUpPatientPage;
