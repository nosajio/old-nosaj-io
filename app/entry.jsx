// Load global styles and index.html file
import './nosaj.scss';
import 'file-loader?name=[name].[ext]!./static/index.html';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

import App from './containers/AppContainer';
import Front from './views/Front';
import Vitae from './views/Vitae';
import Portfolio from './views/Portfolio';
import Post from './views/Post';
import PortfolioProject from './views/Portfolio/Project';
import FourOhFour from './components/FourOhFour';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Front}/>
      <Route path="r/:slug" component={Post} />
      <Route path="vitae" component={Vitae} />
      <Route path="portfolio" component={Portfolio} />
      <Route path="portfolio/:slug" component={PortfolioProject} />
      {/* default 404 route */}
      <Route path="*" component={FourOhFour} />
    </Route>
  </Router>
), document.getElementById('Nosaj'));
