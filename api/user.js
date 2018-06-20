import { API_URL, APP_ACTION, ERROR_CODE } from '../utils/constant';
import ErrorObject from '../objects/errorObject';
import I18n from 'ex-react-native-i18n';

const GET_OAUTH_TOKEN = `${API_URL}/oauth/token`;
const GET_USER_INFO = `${API_URL}/api/user/info`;

const FETCH_TIMEOUT = 15000;
let didTimeout = false;

getTokenUser = (latLng) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const body = {
    grant_type: "password",
    client_id: 2,
    client_secret: "gNLz4yD0EB7V6et8n6JzH5fTRMhkBmi4BDWDb25t",
    username: "user@zaitenllc.com",
    password: "Aa,123456"
  }

  const url = GET_OAUTH_TOKEN;
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
    }, (error) => {
      const e = ErrorObject.initial(500, error.message);
      reject(e);
    }).then((responseData) => {
      if (responseData != null) {
        resolve(responseData);
      }
    })
  });
}

getUserInfo = (token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const url = GET_USER_INFO;
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
      if (responseData != null) {
        resolve(responseData);
      }
    })
  });
}

export default userAPI = {
  getTokenUser,
  getUserInfo,
}