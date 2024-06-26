import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import LandingPage from './components/Landing page';
import SpotDetails from './components/SpotDetails';
import CreateSpot from './components/CreateSpotPage';
import Navigation from './components/Navigation/Navigation-bonus';
import ManageSpots from './components/ManageSpotsPage';
import UpdateSpot from './components/ManageSpotsPage/UpdateSpot';
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal/>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage/> //<== Landing page added
      },
      {
        path: 'spots/:spotId',
        element: <SpotDetails/>//<== SpotDetails page added
      },
      {
        path: 'spots',
        element: <CreateSpot/>//<== CreateSpot page added
      },
      {
        path: 'spots/current',
        element: <ManageSpots/>//<== CreateSpot page added
      },
      {
        path: 'spots/:spotId/edit',
        element: <UpdateSpot/>//<== CreateSpot page added
      },
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
