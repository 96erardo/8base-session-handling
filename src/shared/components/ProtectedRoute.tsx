import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Can } from './Can';

export const ProtectedRoute: React.FC<Props> = ({ perform, component, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  const Component = component;

  if (perform) {
    return (
      <Route 
        {...rest}
        render={(routeProps) => isAuthenticated ? (
          <Can 
            perform={`${perform}:visit`}
            onYes={() => <Component {...routeProps} />}
            onNo={() => <Redirect to={{ pathname: '/' }} />}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { returnTo: routeProps.location.pathname }
            }}
          />
        )}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={({ location }) => isAuthenticated ? (
          <Route 
            component={component}
            {...rest}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { returnTo: location.pathname }
            }}
          />
        )
      }
    />
  );
}

interface Props extends RouteProps {
  perform?: string,
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}