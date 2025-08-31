import { Route, Routes } from 'react-router-dom';

import { Toast } from '@/components/ui/Error';
import UserLayout from '@/layouts/User';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';
import HomePage from './pages/Home';
import Profile from './pages/Profile';

import CreateEvent from './pages/CreateEvent';
import LandingPage from './pages/Landing';
import Attendes from './pages/Attendes';
import EventHiveBooking from './pages/JoinEvent';
import MyEvents from './pages/MyEvents';
import MyBookings from './pages/MyBookings';
import NotificationsPage from './pages/Notifications';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/attendes/:id' element={<Attendes />} />
          <Route path='/myevents' element={<MyEvents />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/events/new' element={<CreateEvent />} />
          <Route path='/register/event/:eventId' element={<EventHiveBooking />} />
          <Route path="/events/edit/:eventId" element={<CreateEvent />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toast />
    </>
  )
}