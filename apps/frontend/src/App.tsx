import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { getUserData } from './app/user/UserThunks';
import Navigation from './pages/PageContainer';
const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return <Navigation />;
};

export default App;
