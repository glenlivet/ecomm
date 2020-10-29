import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

import Products from './components/Products';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
  link: createUploadLink(),
});

const App: React.FC<unknown> = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/products">
              <Products />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
