// PublicRoutes.js
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Inicio, Login, Register } from '../pages';
import { UserContext } from '../../context/userContext';

function PublicRoutes () {
  const {user} = useContext(UserContext); 
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default PublicRoutes;
