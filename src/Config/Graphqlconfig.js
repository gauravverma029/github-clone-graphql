import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache,defaultDataIdFromObject } from 'apollo-cache-inmemory';

const token = "758cf66d8a44a09c0c94a9f1c3c5a8b38c374e69";
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});


const cache = new InMemoryCache();

var client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: 'https://api.github.com/graphql' })),
  cache
});

export default client;