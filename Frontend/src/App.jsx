import { Route, Routes } from 'react-router-dom';

import { Toast } from '@/components/ui/Error';
import UserLayout from '@/layouts/User';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';
import HomePage from './pages/Home';
import Profile from './pages/profile';
import CreateIssue from './pages/report';
import MyIssues from './pages/myIssues';
import Homepage from './pages/homePage';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/report' element={<CreateIssue />} />
          <Route path='/issues' element={<MyIssues />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toast />
    </>
  )
}