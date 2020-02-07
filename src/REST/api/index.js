import Auth from './auth';
import Verification from './verification';
import Redeem from './redeem';
import Topup from './topup';
import Send from './send';
import Users from './users';
import Profile from './profile';
import Activity from './activity';
import Wallets from './wallets';

class Api {
  auth = new Auth();
  verification = new Verification();
  redeem = new Redeem();
  topup = new Topup();
  send = new Send();
  users = new Users();
  profile = new Profile();
  activity = new Activity();
  wallets = new Wallets();
}

export const api = new Api();
