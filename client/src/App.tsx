import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Loader from './common/Loader';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
