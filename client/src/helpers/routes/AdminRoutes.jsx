// AdminRoutes.js
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Register, Dashboard } from '../../pages';
import { UserContext } from '../../../context/userContext';

function AdminRoutes(){
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
