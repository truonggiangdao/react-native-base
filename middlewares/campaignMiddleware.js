import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';

import { APP_ACTION } from '../utils/constant';
import { HandlerException } from '../utils/helper';

import campaignAPI from '../api/campaign';
import campaignState from '../objects/campaignState';

function* handlerGetCampaignByUser(action) {
  try {
    const result = yield campaignAPI.getCampaignByUser(action.user);
    const campaignData = campaignState.wrapJSONToCampaign(result);
    yield put({ type: APP_ACTION.REQUEST_CAMPAIGN_NAME_SUCCESS, campaign: campaignData });
  } catch (error) {
    yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_CAMPAIGN_NAME_FAILURE, error.message));
  }
}

export default newQuoteMiddleware = {
  handlerGetCampaignByUser,
}