import { API_URL, ERROR_CODE } from '../utils/constant';
import ErrorObject from '../objects/errorObject';
import I18n from 'ex-react-native-i18n';

const GET_CAMPAIGN_NAME = `${API_URL}/api/user/[userId]/campaign`;
const GET_TEMPLATE = `${API_URL}/api/campaign/[campaignId]/templates`

const FETCH_TIMEOUT = 15000;
let didTimeout = false;

getCampaignByUser = (credential) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + credential.token,
  };

  const url = GET_CAMPAIGN_NAME.replace('[userId]', credential.userId);
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
      const e = ErrorObject.initial(500, error.message);
      reject(e);
    }).then((responseData) => {
      if(responseData !== null) {
        resolve(responseData);
      }
    })}
  );
}

getTemplateByCampaign = (campainId, token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const url = GET_TEMPLATE.replace('[campaignId]', campainId);
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
      const e = ErrorObject.initial(500, error.message);
      reject(e);
    }).then((responseData) => {
      if (responseData !== null) {
        resolve(responseData);
      }
    })
  }
  );
}

export default campaignAPI = {
  getCampaignByUser,
  getTemplateByCampaign,
}