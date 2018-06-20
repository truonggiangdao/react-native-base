import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';

import userAPI from '../api/user';
import userState from '../objects/userState';
import { APP_ACTION } from '../utils/constant';
import { HandlerException } from '../utils/helper';
import user from '../api/user';

function* handlerGetTokenUser(action) {
  try {
    const result = yield userAPI.getTokenUser(action.requestTokenParams);
    userState.wrappJSONToTokenUserObject(result);
    const token = result.access_token
    const userInfo = yield userAPI.getUserInfo(token)
    userState.wrappJSONToUserObject(userInfo)
    yield put({ type: APP_ACTION.REQUEST_OAUTH_TOKEN_SUCCESS, user: userState });
  } catch (error) {
    yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_OAUTH_TOKEN_FAILURE, error.message));
  }
}

export default userMiddleware = {
  handlerGetTokenUser,
}