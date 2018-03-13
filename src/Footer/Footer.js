import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import client from '../Config/Graphqlconfig';
import gql from 'graphql-tag';
import '../App.css';

class App extends Component {

 render() {
    return (
      <div className="App">
       
      </div>
    );
  }
}

export default App;


