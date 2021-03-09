import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { OnTokenFetched } from './session-events';
import { AUTH_CLIENT_ID, AUTH_LOGOUT_URL } from '../../shared/constants';
import { useHistory } from 'react-router-dom';

export const AuthCallback: React.FC = () => {
  const { isLoading, isAuthenticated, logout, getIdTokenClaims } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading) {
      getIdTokenClaims()
        .then(token => {
          if (!token) {
            return logout({
              client_id: AUTH_CLIENT_ID,
              returnTo: AUTH_LOGOUT_URL,
            })
          }

          return OnTokenFetched.dispatch(token.__raw);
        })
        .catch(error => {

          return logout({
            client_id: AUTH_CLIENT_ID,
            returnTo: AUTH_LOGOUT_URL,
          })
        });
    }
  }, [history, isLoading, isAuthenticated, logout, getIdTokenClaims]);

  return (
    <h1>Loading...</h1>
  )
}