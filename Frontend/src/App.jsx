import { Route, Routes } from 'react-router-dom';

import { Toast } from '@/components/ui/Error';
import UserLayout from '@/layouts/User';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Toast />
    </>
  )
}