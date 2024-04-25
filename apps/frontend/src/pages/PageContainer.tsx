import { Route, Routes, useLocation } from 'react-router-dom';
import ProfilePage from './profile/ProfilePage';
import SignUpPage from './auth/signup/SignUpPage';
import LoginPage from './auth/login/LoginPage';
import LoginPageAuthenticate from './auth/login/LoginPageAuthenticate';
import SignUpPatientPage from './auth/signup/SignUpPatientPage';
import Settings from './settings/settingsPage/settingsPage';
import AppointmentsPage from './Appointments/AppointmentsPage';
import CalendarPage from './Calendar/CalendarPage';
import Sidemenu from '@components/Sidemenu/Sidemenu';
import Header from '@components/UI/Header/Header';

// import page component

// example page component
// const Page = () => { // change Page to another page name
//   return (
//     <>
//       <PageHeader iconVariant={'settings'} title='Test'>
//         {/* <Button type={ButtonTypes.PRIMARY} onClick={() => {}}>Test</Button> */}
//       </PageHeader>
//       Test
//       {/* <section></section> */}
//     </>
//   )
// }
// export default

const PageContainer = () => {
  return (
    <main className='main-wrapper flex h-full w-full flex-col gap-6 overflow-auto bg-background p-8'>
      <Routes>
        {/* <Route path="/path-to-page" Component={Page} /> */}
        <Route path='/profile' Component={ProfilePage} />
        <Route path='/settings' Component={Settings} />
        <Route path='/appointments' Component={AppointmentsPage} />
        <Route path='/calendar' Component={CalendarPage} />
      </Routes>
    </main>
  );
};

const Navigation = () => {
  const location = useLocation();

  const shouldDisplaySidemenu = () => {
    const topLevelPaths = [
      '/payment',
      //..
    ];
    const currentTopLevelPath = location.pathname.split('/')[1];
    return !topLevelPaths.includes('/' + currentTopLevelPath);
  };

  const shouldDispaySmallSideMenu = () => {
    const topLevelPaths = [
      '/calendar',
      //..
    ];
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
    </Routes>
  );
};

export default Navigation;
