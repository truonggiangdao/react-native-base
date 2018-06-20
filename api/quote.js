import { API_URL, ERROR_CODE } from '../utils/constant';
import ErrorObject from '../objects/errorObject';
import I18n from 'ex-react-native-i18n';
import { HandlerException } from '../utils/helper';

const FIND_VEHICLE_API = `${API_URL}/api/vehicle/find?campaign_id=[campaignId]&state=[state]&license_plate=[license]`;
const GET_PRICE_MARKUP_API = `${API_URL}/api/campaign/[id]/price-markup`;
const CREATE_NEW_QUOTE_API = `${API_URL}/api/quote/create`;

const FETCH_TIMEOUT = 15000;
let didTimeout = false;
findVehicle = (campaignId, state, license, token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const url = FIND_VEHICLE_API.replace('[campaignId]', campaignId).replace('[state]', state.code).replace('[license]', license);
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(function () {
      didTimeOut = true;
      const error = ErrorObject.initial(ERROR_CODE.REQUEST_TIME_OUT, I18n.t('request_time_out'))
      reject(error);
    }, FETCH_TIMEOUT);

    fetch(url, {
      method: 'GET',
      headers,
    }).then((response) => {
      clearTimeout(timeout);
      if (response.ok) {
        return response.json();
      }
      const statusCode = response.status;
      response.json().then((data) => {
        const error = ErrorObject.initial(statusCode, data.msg);
        reject(error);
      });
    }, (error) => {
      console.log("EXCEPTION: ", error);
      const e = ErrorObject.initial(500, error.message);
      reject(e);
    }).then((responseData) => {
      if (responseData != null) {
        resolve(responseData);
      }
    })
  });
}

getPriceMarkup = (campaign_id, token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const url = GET_PRICE_MARKUP_API.replace('[id]', campaign_id);
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(function () {
      didTimeOut = true;
      const error = ErrorObject.initial(ERROR_CODE.REQUEST_TIME_OUT, I18n.t('request_time_out'))
      reject(error);
    }, FETCH_TIMEOUT);

    fetch(url, {
      method: 'GET',
      headers,
    }).then((response) => {
      clearTimeout(timeout);
      if (response.ok) {
        return response.json();
      }
      const statusCode = response.status;
      response.json().then((data) => {
        const error = ErrorObject.initial(statusCode, data.msg);
        reject(error);
      });
      return;
    }, (error) => {
      console.log("EXCEPTION: ", error);
      const e = ErrorObject.initial(500, error.message);
      reject(e);
    }).then((responseData) => {
      if (responseData != null) {
        resolve(responseData);
      }
    })
  });
}

createNewQuote = (quoteData) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + quoteData.token,
  };

  const body = {
    "campaign_id": quoteData.campaignId,
    "user_id": quoteData.userId,
    "vehicle": {
      "license_plate": quoteData.license,
      "state": quoteData.state.code,
      "make": quoteData.vehicleInfo.makeID,
      "model": quoteData.vehicleInfo.modelID,
      "year": quoteData.vehicleInfo.year,
      "style": quoteData.vehicleInfo.style,
      "submodel": quoteData.vehicleInfo.submodelID,
      "vin": quoteData.vehicleInfo.vin,
    },
    "markup_id": quoteData.markupPrice.priceID,
    "markup_total": quoteData.markupPrice.percent != null ? quoteData.markupPrice.percent: quoteData.markupPrice.amount,
    "quote_details": [{
      "part_id": quoteData.glassPartId,
      "product_name": 1,
      "manufacturer_name": 1,
      "product_type": quoteData.glassType,
      "quantity": 1,
      "price": 154.40
    }]
  }

  const url = CREATE_NEW_QUOTE_API;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(function () {
      didTimeOut = true;
      const error = ErrorObject.initial(ERROR_CODE.REQUEST_TIME_OUT, I18n.t('request_time_out'))
      reject(error);
    }, FETCH_TIMEOUT);

    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      clearTimeout(timeout);
      if (response.ok) {
        return response.json();
      }
      const statusCode = response.status;
      response.json().then((data) => {
        const error = ErrorObject.initial(statusCode, data.msg);
        reject(error);
      });
      return;
    }, (error) => {
      console.log("EXCEPTION: ", error);
      const e = ErrorObject.initial(500, error.message);
      reject(e);
    }).then((responseData) => {
      if (responseData != null) {
        resolve(responseData);
      }
    })
  });
}

export default quoteAPI = {
  findVehicle,
  getPriceMarkup,
  createNewQuote,
}