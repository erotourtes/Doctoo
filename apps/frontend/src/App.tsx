import { useLocation } from 'react-router';
import Sidemenu from '@components/Sidemenu/Sidemenu';
import PageContainer from './pages/PageContainer';
import Header from '@UI/Header/Header';

const App = () => {
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
    <div className={`flex ${!shouldDisplaySidemenu() ? 'flex-col' : ''} h-screen w-screen overflow-hidden`}>
      {shouldDisplaySidemenu() ? <Sidemenu variant={shouldDispaySmallSideMenu() ? 'small' : 'large'} /> : <Header />}
      <PageContainer />
    </div>
  );
};

export default App;
