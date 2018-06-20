import { APP } from '../utils/constant';

let page = '';
let action = '';
let isRequesting = false;
let success = false;
let isFailure = false;
let errorMessage = '';
let isConnected = null;

initialData = () => {
  return {
    page: APP.NEW_QUOTE,
    action: '',
    isRequesting: false,
    success: false,
    isFailure: false,
    errorMessage: '',
    isConnected: null,
  }
}

updateRequest = (newData) => {
  return {
    ...newData,
  }
}

getCurrentState = () => {
  return {
    page,
    action,
    isRequesting,
    success,
    isFailure,
    errorMessage,
    isConnected,
  }
}

enableRequesting = (actionName) => {
  return {
    action: actionName,
    isRequesting: true,
    success: false,
    isFailure: false,
    errorMessage: '',
  }
}

requestSuccess = () => {
  return {
    isRequesting: false,
    success: true,
    isFailure: false,
    errorMessage: '',
  }
}

updateNetwork = (newStatus) => {
  return {
    isConnected: newStatus,
  }
}

requestFailure = (message) => {
  return {
    isRequesting: false,
    success: false,
    isFailure: true,
    errorMessage: message,
  }
}

updateNewPage = (newPage) => {
  return {
    page: newPage,
    isRequesting: false,
    success: false,
    isFailure: false,
    errorMessage: '',
  }
}

export default appState = {
  page,
  action,
  isRequesting,
  success,
  isFailure,
  errorMessage,
  initialData,
  updateRequest,
  enableRequesting,
  requestSuccess,
  requestFailure,
  getCurrentState,
  updateNetwork,
  updateNewPage,
}