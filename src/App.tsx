import React from 'react';
import { Auth0ProviderWithHistory } from './shared/components/Auth0ProviderWithHistory';
import { ApolloProvider } from '@apollo/client';
import { Session } from './modules/session/Session';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { VisitorsRoute } from './shared/components/VisitorsRoute';
import { client } from './shared/config/apollo-client';

// Routes
import { DashoardView } from './modules/dashboard/DashboardView';
import { ProfileView } from './modules/profile/ProfileView';
import { AdminView } from './modules/admin/AdminView';
import { WorkerView } from './modules/worker/WorkerView';
import { AuthView } from './modules/session/AuthView';

function App() {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <ApolloProvider client={client}>
          <Session>
            <Switch>
              <VisitorsRoute exact path="/auth" component={AuthView} />
              <Route exact path="/dashboard" component={DashoardView} />
              <ProtectedRoute exact path="/profile" component={ProfileView} />
              <ProtectedRoute perform="admin-page" exact path="/admin" component={AdminView} />
              <ProtectedRoute perform="worker-page" exact path="/worker" component={WorkerView} />
              <Redirect to="/dashboard" />
            </Switch>
          </Session>
        </ApolloProvider>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
