import newQuoteState from '../objects/newQuoteState';
import { APP_ACTION, APP } from '../utils/constant';
function handleNewQuote(state = newQuoteState.initialData(), action) {
  // console.log(action);
  switch (action.type) {
    case APP_ACTION.GET_STATE_VALUE:
      newQuoteState.setStateData(action.state);
      const currentState = newQuoteState.getnewQuoteCurrentState();
      return {
        ...state,
        ...currentState,
      }
      case APP.FINAL_QUOTE:
      return {
        ...state,
        ...newQuoteState.getQuoteData(action.quoteData),
      }
      case APP.PRINT_QUOTE:
      return {
        ...state,
        ...newQuoteState.getQuotePrint(action.quotePrint),
      }
    case APP_ACTION.REQUEST_FIND_VEHICLE:
      return {
        ...state,
        step: newQuoteState.STEP_DEFINED.FIND_VEHICLE,
      }
    case APP_ACTION.REQUEST_FIND_VEHICLE_SUCCESS:
      console.log("QUOTE", action.vehicleInfo, action.quote);
      return {
        ...state,
        step: action.quote.step,
        vehicleInfo: {...action.vehicleInfo},
      }
    case APP_ACTION.REQUEST_FIND_VEHICLE_FAILURE:
      return {
        ...state,
        step: newQuoteState.STEP_DEFINED.FIND_VEHICLE,
      }
    case APP_ACTION.REQUEST_PRICE_MARKUP:
      return {
        ...state,
        step: newQuoteState.STEP_DEFINED.FIND_PRICING,
      }
    case APP_ACTION.REQUEST_PRICE_MARKUP_SUCCESS:
      console.log("ACTION: ", action.priceMarkup, action.step);

      return {
        ...state,
        ...action.priceMarkup,
        step: action.step,
      }
    default:
      return state;
  }
}

export default handleNewQuote;