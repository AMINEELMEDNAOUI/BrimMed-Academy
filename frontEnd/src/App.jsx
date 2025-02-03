import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './Login';
import CreateAccst from './createAccst';
import AdminDash from './adminDash';
import ProfDashboard from './profDashboard';
import StudentDashboard from './studentDashboard';
import PrivateRoute from './privateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/createAccst' element={<CreateAccst />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/adminDash' element={
          <PrivateRoute roles={['ADMIN']} element={<AdminDash />} />
        } />
        <Route exact path='/profDashboard' element={
          <PrivateRoute roles={['TEACHER']} element={<ProfDashboard />} />
        } />
        <Route exact path='/studentDashboard' element={
          <PrivateRoute roles={['STUDENT']} element={<StudentDashboard />} />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
