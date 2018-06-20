import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';

import { APP_ACTION } from "../utils/constant";
import { HandlerException } from '../utils/helper';

import campaignAPI from '../api/campaign';
import templateState from '../objects/templateState';

function* handlerGetTemplate(action) {
  try {
    const data = yield campaignAPI.getTemplateByCampaign(action.campaignId, action.token);
    const template = templateState.wrapJSONToTemplateObject(data);
    yield put({ type: APP_ACTION.REQUEST_GET_TEMPLATE_SUCCESS, template });
  } catch (error) {
    yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_GET_TEMPLATE_FAILURE, error.message));
  }
}

export default templateMiddleware = {
  handlerGetTemplate,
}