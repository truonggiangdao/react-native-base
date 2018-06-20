import { APP_ACTION } from '../utils/constant';

const requestToken = (requestTokenParams) => ({
  type: APP_ACTION.REQUEST_OAUTH_TOKEN,
  requestTokenParams,
});

export default userAction = {
  requestToken,
}