import { Route, Routes } from 'react-router-dom';

import { Toast } from '@/components/ui/Error';
import UserLayout from '@/layouts/User';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/profile';
import CreateIssue from './pages/report';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
        </Route>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/report' element={<CreateIssue />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toast />
    </>
  )
}