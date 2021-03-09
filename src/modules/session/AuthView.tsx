import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';

export const AuthView: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    loginWithRedirect({
      appState: location.state
    });
  }, [location, loginWithRedirect]);

  return (
    <h1>Loading...</h1>
  )
}