import './App.css';
import Sidemenu from './components/sidemenu/Sidemenu';
// import { Counter } from './features/counter/Counter';
// import { Quotes } from './features/quotes/Quotes';
// import logo from './logo.svg';
import PageContainer from './pages/PageContainer';

const App = () => {
  return (
    <div className='App flex h-screen w-screen overflow-hidden'>
      <Sidemenu />
      <PageContainer />
    </div>
  );
};

export default App;
