import { useAppSelector } from '@/app/hooks';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import { Role } from '@/dataTypes/User';
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';

const DashboardPage = () => {
  const user = useAppSelector(state => state.user.data);
  return <div>{user.role == Role.PATIENT ? <PatientDashboard /> : <DoctorDashboard />}</div>;
};

export default DashboardPage;
