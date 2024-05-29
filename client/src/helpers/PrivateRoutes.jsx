// PrivateRoutes.js
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard, Logout } from '../pages';
import { UserContext } from '../../context/userContext';

function PrivateRoutes(){
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<Dashboard />} />
      <Route path='/' element={<Dashboard />} />
    </Routes>
  );
};

export default PrivateRoutes;
