import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { store } from './init/store';

import 'react-phone-number-input/style.css';
// import 'react-select/dist/react-select.css';
import './theme/init.scss';

import App from './navigation/App';
import { history } from './helper/history';

import * as serviceWorker from './serviceWorker';

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
