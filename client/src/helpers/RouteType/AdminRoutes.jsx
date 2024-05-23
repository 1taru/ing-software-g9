import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { Register } from '../../pages';

export const AdminRoutes = () => {
  return (
    <>
        <Route path='/register' element={<Register />} />
    </>
  )
};
