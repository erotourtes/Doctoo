import { Route, Routes } from 'react-router-dom';
import ProfilePage from './profile/ProfilePage';
import Settings from './settings/settingsPage/settingsPage';

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
        <Route path='/settings' Component={Settings} />
      </Routes>
    </main>
  );
};

export default PageContainer;
