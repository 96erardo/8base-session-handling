import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider, AppState } from '@auth0/auth0-react';
import {
  AUTH_CLIENT_DOMAIN,
  AUTH_CLIENT_ID,
  AUTH_REDIRECT_URL
} from '../constants';

export const Auth0ProviderWithHistory: React.FC = ({ children }) => {
  const history = useHistory();

  const onRedirectCallback = (appState: AppState) => {
    console.log('onRedirectCallback', appState);
    history.push(appState?.returnTo || '/dashboard');
  };

  return (
    <Auth0Provider
      domain={AUTH_CLIENT_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      redirectUri={AUTH_REDIRECT_URL}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}