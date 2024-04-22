import Sidemenu from './components/sidemenu/Sidemenu';
import PageContainer from './pages/PageContainer';

const App = () => {
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <Sidemenu />
      <PageContainer />
    </div>
  );
};

export default App;