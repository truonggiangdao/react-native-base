import vehicleState from './vehicleState';
import priceMarkupState from './priceMarkupState';

const STEP_DEFINED = {
  FIND_VEHICLE: 'FIND_VEHICLE',
  FIND_PRICING: 'FIND_PRICING',
  FINALIZE: 'FINALIZE',
}
let _state = '';
let _campaignName = '';
let _license = '';
let _step = STEP_DEFINED.FIND_VEHICLE;
let _priceMarkup = [];

initialData = () => {
  return {
    state: '',
    license: '',
    vehicleInfo: vehicleState.initialData(),
    priceMarkup: [],
    quoteData: null,
    quotePrint: null,
    step: STEP_DEFINED.FIND_VEHICLE,
  }
}

setStateData = (state) => { _state = state.toUpperCase() }
setLicenseData = (license) => { _license = license }
setCampaignName = (name) => { _campaignName = name }
setStep = (newStep) => {
  switch (newStep) {
    case STEP_DEFINED.FIND_VEHICLE:
    case STEP_DEFINED.FIND_PRICING:
    case STEP_DEFINED.FINALIZE:
      _step = newStep
      return;
    default:
      break;
  }
}

getState = () => _state;
getLicense = () => _license;
getCampaignName = () => _campaignName;
getStep = () => _step;
getPriceMarkup = () => _priceMarkup;

getnewQuoteCurrentState = () => {
  return {
    state: getState(),
    license: getLicense(),
    vehicleInfo: vehicleState.getVehicleCurrentState(),
    priceMarkup: getPriceMarkup(),
    step: getStep(),
  }
}

// WRAP JSON DATA TO OBJECT
wrapJSONtoQuoteObjectFromGOOGLEAPI = (jsonObject) => {
  const data = jsonObject.results[0].address_components.find(item => {
    return item.types[0] === 'administrative_area_level_1'
  });
  return data.long_name;
}

updateVehicleData = () => {
  return {
    vehicleInfo: { ...vehicleState},
  }
}

updatePriceMarkupData = (newData) => {
  const data = priceMarkupState.wrappJSONtoArray(newData)
  _priceMarkup = data
  return {
    priceMarkup: data,
  }
}

getQuoteData = (quoteData) => {
  return {
    quoteData,
    quotePrint: null,
  }
}

getQuotePrint = (quotePrint) => {
  return {
    quotePrint,
  }
}

export default newQuoteState = {
  state: getState(),
  license: getLicense(),
  step: getStep(),
  vehicleInfo: vehicleState,
  priceMarkup: getPriceMarkup(),
  initialData,
  setStateData,
  setStep,
  getStep,
  getnewQuoteCurrentState,
  updateVehicleData,
  updatePriceMarkupData,
  getQuoteData,
  getQuotePrint,
  wrapJSONtoQuoteObjectFromGOOGLEAPI,
  STEP_DEFINED,
}