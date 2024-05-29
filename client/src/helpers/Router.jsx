
import React, { useContext } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { Dashboard, Inicio, Login, Register, Logout} from '../pages'
import { UserContext } from '../../context/userContext'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import AdminRoutes from './AdminRoutes'

export const Router = () => {

  const { user } = useContext(UserContext);
  
  return (
    <>
      {!user && <PublicRoutes/>}
      {user && <PrivateRoutes/>}
      {(user && user.accType=='admin') && <AdminRoutes/>}
    </>
  )
}
