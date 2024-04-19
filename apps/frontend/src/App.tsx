import './App.css';
import Sidemenu from './components/sidemenu/Sidemenu';
// import { Counter } from './features/counter/Counter';
// import { Quotes } from './features/quotes/Quotes';
// import logo from './logo.svg';
import PageContainer from './pages/PageContainer';
import Form from './components/UI/Input/Form'

const App = () => {
  return (
    <div className='App w-screen h-screen overflow-hidden flex'>
      {/* <Sidemenu />
      <PageContainer />  */}
      <Form />
    </div>
  );
};

export default App;
