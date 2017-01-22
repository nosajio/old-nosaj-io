// Load global styles and index.html file
import './nosaj.scss';
import 'file-loader?name=[name].[ext]!./static/index.html';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

import App from './views/App';
import Front from './views/Front';
import Post from './views/Post';
import Portfolio from './views/Portfolio';
import PortfolioProject from './views/Portfolio/Project';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Front}/>
      <Route path="read/:slug" component={Post}/>
      <Route path="portfolio" component={Portfolio}/>
      <Route path="portfolio/:slug" component={PortfolioProject}/>
    </Route>
  </Router>
), document.getElementById('Nosaj'));
