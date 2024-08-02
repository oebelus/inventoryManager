// index.tsx (or index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import Dashboard from './pages/Dashboard';
import PublicRoute from './PublicRoute';
import Profile from './pages/Profile';
import Inventory from './pages/Inventory';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={
        <>
          <PageTitle title="Pantry Tracker" />
          <Home />
        </>
      } />
      <Route path='' element={<PublicRoute />}>
        <Route path='signin' element={
          <>
            <PageTitle title="SignIn" />
            <SignIn />
          </>
        } />
        <Route path='signup' element={
          <>
            <PageTitle title="SignUp" />
            <SignUp />
          </>
        } />
      </Route>
      <Route path='' element={<ProtectedRoute />}>
        <Route path='dashboard' element={
          <>
            <PageTitle title="Pantry Tracker: Dashboard" />
            <Dashboard />
          </>
        } />
        <Route path='profile' element={
          <>
            <PageTitle title="My Profile" />
            <Profile />
          </>
        } />
        <Route path='inventory' element={
          <>
            <PageTitle title="My Inventory" />
            <Inventory />
          </>
        } />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
