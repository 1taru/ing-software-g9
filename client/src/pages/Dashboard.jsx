import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

export const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Hero/>
    </>
  );
};
