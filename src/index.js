import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Profile from './Profile/Profile';
import Detail from './Profile/Detail';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
  <Router>
      <div>
        <Route path="/" component={Header} />
        <Route exact path="/:userName" component={Profile} />
        <Route exact path="/:userName/:reponame" component={Detail} />
      	<Route exact path="/" component={Profile} />
      </div>
  </Router>,
  document.getElementById('root')
)