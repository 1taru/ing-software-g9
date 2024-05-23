
import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export const Logout = () => {

  const {logoutUser} = useContext(UserContext);
  const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
        navigate('/login');
    }, [logoutUser,navigate]);

  return null;
};
