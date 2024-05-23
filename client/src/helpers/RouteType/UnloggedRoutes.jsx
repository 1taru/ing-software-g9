import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Inicio, Login } from '../../pages';

export const UnloggedRoutes = () => {
  return (
    <>
      <Route path='/' element={<Inicio />} />
      <Route path='/login' element={<Login />} />
    </>
  );
};
