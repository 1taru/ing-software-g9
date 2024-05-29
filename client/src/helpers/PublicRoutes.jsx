// PublicRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Inicio, Login, Register } from '../pages';

function PublicRoutes () {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default PublicRoutes;
