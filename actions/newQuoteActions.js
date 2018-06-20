import { APP_ACTION, APP } from "../utils/constant";

const setGPSLocationDefault = (location) => ({
  type: APP_ACTION.SET_GPS_LOCATION_DATA,
  location,
});

const findVehicleByInfo = (campaignId, license, state, token) => ({
  type: APP_ACTION.REQUEST_FIND_VEHICLE,
  campaignId,
  license,
  state,
  token,
});

const getPriceMarkup = (campaignId, token) => ({
  type: APP_ACTION.REQUEST_PRICE_MARKUP,
  campaignId,
  token,
});

const moveToPrintCode = (quoteData) => ({
  type: APP.FINAL_QUOTE,
  quoteData,
})

const createNewQuote = (user, quoteData, contentWebHeight) => ({
  type: APP_ACTION.REQUEST_CREATE_NEW_QUOTE,
  user,
  quoteData,
  contentWebHeight,
});

export default newQuoteAction = {
  setGPSLocationDefault,
  findVehicleByInfo,
  getPriceMarkup,
  moveToPrintCode,
  createNewQuote,
}