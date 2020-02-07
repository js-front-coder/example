// Core
import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import {
  SignUp,
  Login,
  ForgotPassword,
  ResetPassword,
  SecondAuthentication
} from 'components/';

import { book } from './book';

const Public = () => {
  return (
    <Switch>
      <Route exact component={Login} path={book.login} />
      <Route exact component={SignUp} path={book.signup} />
      <Route exact component={ForgotPassword} path={book.forgotPassword} />
      <Route exact component={ResetPassword} path={book.resetPassword} />
      <Route
        exact
        component={SecondAuthentication}
        path={book.secondAuthentication}
      />
      <Redirect to={book.login} />
    </Switch>
  );
};

export default Public;
