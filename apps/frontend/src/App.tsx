import Sidemenu from './components/sidemenu/Sidemenu';
import PageContainer from './pages/PageContainer';
import Form from './components/UI/Input/Form'

const App = () => {
  return (
    <div className='App w-screen h-screen overflow-hidden flex'>
      {/* <Sidemenu />
      <PageContainer />  */}
      <Form />
      <Sidemenu />
      <PageContainer />
    </div>
  );
};

export default App;
