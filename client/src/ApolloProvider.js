import React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import App from './App';

const host_apollo_server = process.env.REACT_APP_APOLLO_SERVER || 'localhost';
console.log('connecting to', host_apollo_server);
const httpLink = createHttpLink({
    uri: `http://${host_apollo_server}:5000`
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default function MyApolloProvider(){
    return (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)};