import { Route, Routes } from 'react-router-dom';
import ProfilePage from './profile/ProfilePage';
import SignUpPage from './auth/signup/SignUpPage';
import LoginPage from './auth/login/LoginPage';
import LoginPageAuthenticate from './auth/login/LoginPageAuthenticate';
import SignUpPatientPage from './auth/signup/SignUpPatientPage';
import Sidemenu from '../components/Sidemenu/Sidemenu';

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
    <main className='main-wrapper flex w-full flex-col gap-6 overflow-auto bg-background p-8'>
      <Routes>
        {/* <Route path="/path-to-page" Component={Page} /> */}
        <Route path='/profile' Component={ProfilePage} />
      </Routes>
    </main>
  );
};

const Navigation = () => {
  return (
    <Routes>
      <Route
        path='*'
        element={
          <div className='flex h-screen w-screen overflow-hidden'>
            <Sidemenu />
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
