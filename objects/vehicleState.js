import newQuoteActions from "../actions/newQuoteActions";

let vehicleID = ''
let makeID = ''
let modelID = ''
let year = ''
let style = ''
let submodelID = ''
let vin = ''

initialData = () => {
  return {
    vehicleID: '',
    makeID: '',
    modelID: '',
    year: '',
    style: '',
    submodelID: '',
    vin: '',
  }
}

setVehicle = (newValue) => {
  vehicleID = newValue
};
setMake = (newValue) => {
  makeID = newValue
};
setModel = (newValue) => {
  modelID = newValue
};
setYear = (newValue) => {
  year = newValue
};
setSubmodel = (newValue) => {
  submodelID = newValue
};
setStyle = (newValue) => {
  style = newValue
}
setVIN = (newValue) => {
  vin = newValue
}

getVehicleID = () => vehicleID;
getMake = () => makeID;
getModel = () => modelID;
getYear = () => year;
getSubmodel = () => submodelID;
getStyle = () => style;
getVIN = () => vin;

getVehicleCurrentState = () => {
  return {
    vehicleID: getVehicleID(),
    makeID: getMake(),
    modelID: getModel(),
    year: getYear(),
    style: getStyle(),
    submodelID: getSubmodel(),
    vin: getVIN(),
  }
}
// WRAP JSON DATA TO OBJECT
wrapJSONToVehicle = (jsonObject) => {
  // setVehicle(jsonObject.data.VehicleID);
  setMake(jsonObject.data.make);
  setModel(jsonObject.data.model);
  setYear(jsonObject.data.year);
  setStyle(jsonObject.data.style);
  setSubmodel(jsonObject.data.submodel);
  setVIN(jsonObject.data.vin);
  return getVehicleCurrentState();
}

export default vehicleState = {
  vehicleID: getVehicleID(),
  make: getMake(),
  model: getModel(),
  year: getYear(),
  style: getStyle(),
  submodel: getSubmodel(),
  vin: getVIN(),
  initialData,
  getVehicleCurrentState,
  wrapJSONToVehicle,
}