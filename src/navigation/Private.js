// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';


import { authActions } from 'bus/auth/actions';

import {
  Header,
  Footer,
  Notification,
  Status,
  Selfie,
  Passport,
  Certificate,
  Licence,
  Wallets,
  Send,
  Topup,
  Redeem,
  TopupBank,
  TopupCash,
  RedeemBank,
  Settings,
  AllActivity,
  SendActivity,
  TopupActivity,
  RedeemActivity,
  Chat
} from 'components';

import { book } from './book';

const Private = ({ authenticateAsync, userIsVerified }) => {
  useEffect(() => {
    authenticateAsync();
  }, [authenticateAsync]);

  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          component={Notification}
          path={book.verification.notification}
        />

        <Route exact component={Passport} path={book.verification.passport} />
        <Route
          exact
          component={Certificate}
          path={book.verification.certificate}
        />
        <Route exact component={Licence} path={book.verification.licence} />

        <Route exact component={Selfie} path={book.verification.selfie} />
        <Route exact component={Status} path={book.verification.status} />

        <Route component={Wallets} path={book.wallets.wallets} />
        <Route exact component={Send} path={book.send} />
        <Route exact component={Chat} path={book.chat} />

        <Route
          exact
          path={book.topupRedeem.topupRedeem}
          render={() => <Redirect to={book.topupRedeem.topup} />}
        />

        <Route exact component={Topup} path={book.topupRedeem.topup} />
        <Route exact component={Redeem} path={book.topupRedeem.redeem} />
        <Route exact component={TopupBank} path={book.topupRedeem.topupBank} />
        <Route exact component={TopupCash} path={book.topupRedeem.topupCash} />
          <Route exact component={TopupCash} path={book.topupRedeem.redeemCash} />
        <Route
          exact
          component={RedeemBank}
          path={book.topupRedeem.redeemBank}
        />

        <Route exact component={Settings} path={book.settings} />

        <Route
          exact
          path={book.activity.activity}
          render={() => <Redirect to={book.activity.all} />}
        />

        <Route exact component={AllActivity} path={book.activity.all} />

        <Route exact component={SendActivity} path={book.activity.send} />

        <Route exact component={TopupActivity} path={book.activity.topup} />

        <Route exact component={RedeemActivity} path={book.activity.redeem} />

        <Redirect to={book.verification.notification} />
        {/*<Redirect to={book.chat} />*/}
      </Switch>
      <Footer />
    </>
  );
};

const mapStateToProps = state => ({
  topup: state.topup,
  userIsVerified: state.profile.user.isVerified
});


const mapDispatchToProps = {
  authenticateAsync: authActions.authenticateAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Private);
