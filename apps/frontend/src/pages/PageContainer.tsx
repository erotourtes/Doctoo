import ProtectPatientRoute from '@/pages/auth/ProtectPatientPage';
import Sidemenu from '@components/Sidemenu/Sidemenu';
import Header from '@components/UI/Header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppointmentsPage from './Appointments/AppointmentsPage';
import CalendarPage from './Calendar/CalendarPage';
import EmailChangePage from './EmailChange/EmailChangePage';
import MyDoctorsPage from './MyDoctors/MyDoctorsPage';
import { PaymentPage } from './PaymentPage/PaymentPage';
import ProfilePage from './Profile/ProfilePage';
import ReviewsPage from './Reviews/ReviewsPage';
import LoginPage from './auth/login/LoginPage';
import LoginPageAuthenticate from './auth/login/LoginPageAuthenticate';
import LogoutPage from './auth/logout/Logout';
import SignUpPage from './auth/signup/SignUpPage';
import SignUpPatientPage from './auth/signup/SignUpPatientPage';
import DashboardPage from './dashboard/DashboardPage';
import Settings from './settings/settingsPage/settingsPage';
import DoctorLoginPage from './auth/login/DoctorLoginPage';

const PageContainer = () => {
  return (
    <main className='main-wrapper flex h-full w-full flex-col gap-6 overflow-auto bg-background p-8 px-4 sm:px-8'>
      <Routes>
        <Route path='/' Component={ProtectPatientRoute}>
          <Route path='/profile' Component={ProfilePage} />
          <Route path='/dashboard' Component={DashboardPage} />
          <Route path='/settings' Component={Settings} />
          <Route path='/payment' Component={PaymentPage} />
          <Route path='/my-doctors' Component={MyDoctorsPage} />
          <Route path='/calendar' Component={CalendarPage} />
          <Route path='/reviews' Component={ReviewsPage} />
          <Route path='/appointments' Component={AppointmentsPage} />
          <Route path='/logout' Component={LogoutPage} />
        </Route>
      </Routes>
    </main>
  );
};

const Navigation = () => {
  const location = useLocation();

  const shouldDisplaySidemenu = () => {
    const topLevelPaths = ['/payment'];
    const currentTopLevelPath = location.pathname.split('/')[1];
    return !topLevelPaths.includes('/' + currentTopLevelPath);
  };

  const shouldDispaySmallSideMenu = () => {
    const topLevelPaths = ['/calendar'];
    const currentTopLevelPath = location.pathname.split('/')[1];
    return topLevelPaths.includes('/' + currentTopLevelPath);
  };

  return (
    <Routes>
      <Route
        path='*'
        element={
          <div className={`flex ${!shouldDisplaySidemenu() ? 'flex-col' : ''} h-screen w-screen overflow-hidden`}>
            {shouldDisplaySidemenu() ? (
              <Sidemenu variant={shouldDispaySmallSideMenu() ? 'small' : 'large'} />
            ) : (
              <Header />
            )}
            <PageContainer />
          </div>
        }
      />

      <Route path='/signup' Component={SignUpPage} />
      <Route path='/signup/patient' Component={SignUpPatientPage} />
      <Route path='/login/authenticate' Component={LoginPageAuthenticate} />
      <Route path='/login' Component={LoginPage} />
      <Route path='/login/doctor' Component={DoctorLoginPage} />
      <Route path='/change-email' Component={EmailChangePage} />
    </Routes>
  );
};

export default Navigation;
