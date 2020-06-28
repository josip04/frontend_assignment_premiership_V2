import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';

import { Provider } from 'react-redux';
import configureStore from './store/store';
import {getAllMatches} from './actions/actions';


import 'bootstrap/dist/css/bootstrap.min.css';//https://www.techiediaries.com/react-bootstrap/


import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css';


const store = configureStore();
store.dispatch(getAllMatches());

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);