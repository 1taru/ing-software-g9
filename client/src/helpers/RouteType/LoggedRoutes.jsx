
import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { Dashboard, Logout } from '../../pages';

export const LoggedRoutes = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  );
};
