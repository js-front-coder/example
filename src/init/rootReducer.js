import { combineReducers } from 'redux';

import { authReducer as auth } from 'bus/auth/reducer';
import { profileReducer as profile } from 'bus/profile/reducer';
import { verificationReducer as verification } from 'bus/verification/reducer';
import { topupReducer as topup } from 'bus/topup/reducer';
import { redeemReducer as redeem } from 'bus/redeem/reducer';
import { sendReducer as send } from 'bus/send/reducer';
import { usersReducer as users } from 'bus/users/reducer';
import { uiReducer as ui } from 'bus/ui/reducer';
import { activityReducer as activity } from 'bus/activity/reducer';
import { walletsReducer as wallets } from 'bus/wallets/reducer';
import { chatReducer as chat } from 'bus/chat/reducer';
import { currencyReducer as currency } from 'bus/currency/reducer';

export const rootReducer = combineReducers({
  auth,
  profile,
  verification,
  topup,
  redeem,
  send,
  users,
  ui,
  activity,
  wallets,
  chat,
  currency
});
