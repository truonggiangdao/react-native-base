import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';

import { APP_ACTION, APP } from '../utils/constant';
import { HandlerException } from '../utils/helper';
import AppNavigatorService from '../utils/navigators/AppNavigatorService';

import googleAPI from '../api/googleMap';
import quoteAPI from '../api/quote';

import newQuoteState from '../objects/newQuoteState';
import vehicleState from '../objects/vehicleState';

function* handlerGPSLocationSet(action) {
  try {
    const latlngValue = `${action.location.lat},${action.location.lng}`;
    const result = yield googleAPI.getStateFromLocation(latlngValue);
    const state = newQuoteState.wrapJSONtoQuoteObjectFromGOOGLEAPI(result);
    yield put({ type: APP_ACTION.GET_STATE_VALUE, state: state })
  } catch (error) {
    console.log("ERROR", error);
  }
}

function* handlerFindVehicle(action) {
  try {
    const result = yield quoteAPI.findVehicle(action.campaignId, action.state, action.license, action.token);
    const info = vehicleState.wrapJSONToVehicle(result);
    newQuoteState.vehicleInfo = { ...info}
    newQuoteState.setStep(newQuoteState.STEP_DEFINED.FIND_PRICING)
    yield put({ type: APP_ACTION.REQUEST_FIND_VEHICLE_SUCCESS, vehicleInfo: newQuoteState.vehicleInfo, quote: newQuoteState.getnewQuoteCurrentState()});
  } catch (error) {
    // console.log("ERROR", error);
    yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_FIND_VEHICLE_FAILURE, error.message));
  }
}

function* handlerGetPriceMarkup(action) {
  try {
    const result = yield quoteAPI.getPriceMarkup(action.campaignId, action.token);
    const data = newQuoteState.updatePriceMarkupData(result);
    // console.log("DATA: ", data);
    newQuoteState.setStep(newQuoteState.STEP_DEFINED.FINALIZE)

    yield put({ type: APP_ACTION.REQUEST_PRICE_MARKUP_SUCCESS, priceMarkup: data, step: newQuoteState.STEP_DEFINED.FINALIZE });
  } catch (error) {
    yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_PRICE_MARKUP_FAILURE, error.message));
  }
}

function* handlerCreateNewQuote(action) {
  try {
    const quoteData = {
      userId: action.user.userId,
      state: action.quoteData.stateSelected,
      campaignId: action.quoteData.campaignID,
      vehicleInfo: action.quoteData.vehicleInfo,
      glassType: action.quoteData.glassTypeSelected,
      glassPartId: action.quoteData.glassPartId,
      markupPrice: action.quoteData.makrupSelected,
      token: action.user.token,
      license: action.quoteData.license,
    }
    const result = yield quoteAPI.createNewQuote(quoteData)
    yield put({ type: APP_ACTION.REQUEST_CREATE_NEW_QUOTE_SUCCESS, result, contentWebHeight: action.contentWebHeight})
  } catch (error) {
    yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_CAMPAIGN_NAME_FAILURE, error.message));
  }
}

function* navigateToFinalQuotePage(action) {
  try {
    yield AppNavigatorService.navigate('FinalQuote');
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

function* navigateToPrintQuote(action) {
  try {
    yield AppNavigatorService.navigate('PrintQuote', { contentWebHeight: action.contentWebHeight});
    yield put({ type: APP.PRINT_QUOTE, quotePrint: action.result.data})
  } catch (error) {
    console.log("ERROR: ", error);

  }
}

export default newQuoteMiddleware = {
  handlerGPSLocationSet,
  handlerFindVehicle,
  handlerGetPriceMarkup,
  handlerCreateNewQuote,
  navigateToFinalQuotePage,
  navigateToPrintQuote,
}