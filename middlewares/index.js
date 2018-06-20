import { all, takeLatest } from 'redux-saga/effects';

import { APP_ACTION, APP } from '../utils/constant';

import appMiddleware from './appMiddleware';
import newQuoteMiddleware from './newQuoteMiddleware';
import userMiddleware from './userMiddleware';
import campaignMiddleware from './campaignMiddleware';
import templateMiddleware from './templateMiddleware';

function* handlerGPSLocationSetMiddleware() {
  yield takeLatest(APP_ACTION.SET_GPS_LOCATION_DATA, newQuoteMiddleware.handlerGPSLocationSet);
}

function* handlerFindVehicleMiddleware() {
  yield takeLatest(APP_ACTION.REQUEST_FIND_VEHICLE, newQuoteMiddleware.handlerFindVehicle);
}

function* handlerRequestCampaignMiddleware() {
  yield takeLatest(APP_ACTION.REQUEST_CAMPAIGN_NAME, campaignMiddleware.handlerGetCampaignByUser);
}

function* handlerUserRequestTokenMiddleware() {
  yield takeLatest(APP_ACTION.REQUEST_OAUTH_TOKEN, userMiddleware.handlerGetTokenUser);
}

function* handlerGetPriceMarkupMiddleware() {
  yield takeLatest(APP_ACTION.REQUEST_PRICE_MARKUP, newQuoteMiddleware.handlerGetPriceMarkup);
}

function* handlerCreateNewQuoteMiddleware() {
  yield takeLatest(APP_ACTION.REQUEST_CREATE_NEW_QUOTE, newQuoteMiddleware.handlerCreateNewQuote);
}

function* handlerNavigateToFinalQuote() {
  yield takeLatest(APP.FINAL_QUOTE, newQuoteMiddleware.navigateToFinalQuotePage);
}

function* handlerCreateNewQuoteSuccessfullyMiddleware() {
  yield takeLatest(APP_ACTION.REQUEST_CREATE_NEW_QUOTE_SUCCESS, newQuoteMiddleware.navigateToPrintQuote)
}

function* handlerGetTemplateMiddleware() {
  yield takeLatest(APP_ACTION.REQUEST_GET_TEMPLATE, templateMiddleware.handlerGetTemplate);
}

function* handlerBackPreviousPageMiddleware() {
  yield takeLatest(APP_ACTION.REQUEST_BACK, appMiddleware.handlerBackButton)
}

export default function* rootSaga() {
  yield all([
    handlerGPSLocationSetMiddleware(),
    handlerUserRequestTokenMiddleware(),
    handlerRequestCampaignMiddleware(),
    handlerFindVehicleMiddleware(),
    handlerGetPriceMarkupMiddleware(),
    handlerCreateNewQuoteMiddleware(),
    handlerNavigateToFinalQuote(),
    handlerCreateNewQuoteSuccessfullyMiddleware(),
    handlerGetTemplateMiddleware(),
    handlerBackPreviousPageMiddleware(),
  ]);
}