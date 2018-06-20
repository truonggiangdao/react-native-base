import { GOOGLE_API_KEY } from '../utils/constant';

const GOOGLE_MAP_GEOCODING_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=[latlng]&key=${GOOGLE_API_KEY}`

const FETCH_TIMEOUT = 15000;
let didTimeout = false;

getStateFromLocation = (latLng) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const url = GOOGLE_MAP_GEOCODING_URL.replace('[latlng]', latLng);
  return new Promise((resolve, reject) => fetch(url, {
    method: 'GET',
    headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    const statusCode = response.status;
    reject(new Error(statusCode));
  }, (error) => {
    reject(new Error(error.message));
  }).then((responseData) => {
    resolve(responseData);
  }));
}

export default googleAPI = {
  getStateFromLocation,
}