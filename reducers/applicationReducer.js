import appState from '../objects/appState';
import { APP_ACTION, APP } from '../utils/constant';

function handleApplication(state = appState.initialData(), action) {
  // console.log(action);
  switch (action.type) {

    case APP_ACTION.NETWORK_CHANGED:
      return {
        ...state,
        ...appState.updateNetwork(action.isConnected),
      }

    case APP.NEW_QUOTE:
    case APP.FINAL_QUOTE:
    case APP.PRINT_QUOTE:
      return {
        ...state,
        ...appState.updateNewPage(action.type),
      }

    case APP_ACTION.REQUEST_BACK:
      switch (action.currentPage) {
        case APP.FINAL_QUOTE:
          return {
            ...state,
            ...appState.updateNewPage(APP.NEW_QUOTE),
          }
        case APP.PRINT_QUOTE:
          return {
            ...state,
            ...appState.updateNewPage(APP.FINAL_QUOTE),
          }
        default:
          return {
            ...state
          };
      }

    case APP_ACTION.REQUEST_CAMPAIGN_NAME:
    case APP_ACTION.REQUEST_OAUTH_TOKEN:
    case APP_ACTION.REQUEST_FIND_VEHICLE:
    case APP_ACTION.REQUEST_PRICE_MARKUP:
    case APP_ACTION.REQUEST_CREATE_NEW_QUOTE:
    case APP_ACTION.REQUEST_GET_TEMPLATE:
      console.log("REQUEST: ", appState.enableRequesting(action.type));
      const data = appState.enableRequesting(action.type);
      return {
        ...state,
        ...data,
      };

    case APP_ACTION.REQUEST_OAUTH_TOKEN_SUCCESS:
    case APP_ACTION.REQUEST_CAMPAIGN_NAME_SUCCESS:
    case APP_ACTION.REQUEST_FIND_VEHICLE_SUCCESS:
    case APP_ACTION.REQUEST_PRICE_MARKUP_SUCCESS:
    case APP_ACTION.REQUEST_CREATE_NEW_QUOTE_SUCCESS:
    case APP_ACTION.REQUEST_GET_TEMPLATE_SUCCESS:
      // console.log("REQUEST SUCCESS: ", appState.requestSuccess(), action);
      return {
        ...state,
        ...appState.requestSuccess(),
      };

    case APP_ACTION.REQUEST_TIME_OUT:
    case APP_ACTION.REQUEST_OAUTH_TOKEN_FAILURE:
    case APP_ACTION.REQUEST_CAMPAIGN_NAME_FAILURE:
    case APP_ACTION.REQUEST_FIND_VEHICLE_FAILURE:
    case APP_ACTION.REQUEST_PRICE_MARKUP_FAILURE:
    case APP_ACTION.REQUEST_CREATE_NEW_QUOTE_FAILURE:
    case APP_ACTION.REQUEST_GET_TEMPLATE_FAILURE:
      // console.log("REQUEST FAILURE: ", action);
      return {
        ...state,
        ...appState.requestFailure(action.state.errorMessage),
      };

    default: return state;
  }
}

export default handleApplication;
