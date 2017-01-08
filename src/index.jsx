// Import polyfills
import 'whatwg-fetch';

import React from 'react';
import {render} from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

import Nosaj from './views/Nosaj'
import Open  from './views/Open';
import Post  from './views/Post';


render((
  <Router history={browserHistory}>
    <Route path="/" component={Nosaj}>
      <IndexRoute component={Open}/>
      <Route path=":slug" component={Post}/>
    </Route>
  </Router>
), document.getElementById('nosaj'));
