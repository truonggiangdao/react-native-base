let id = '';
let markup_type = {
  id: '',
  name: '',
  description: null,
  visibled: false,
};
let percent = null;
let amount = 0.00;
let visibled = false;

initialData = () => {
  return {
    priceID: '',
    percent: null,
    amount: 0,
    markup_type: {
      id: '',
      name: '',
      description: '',
      visibled: false,
    },
    visibled: false,
  }
}

getPriceID = () => id;
getPercent = () => percent;
getAmount = () => amount;
getVisibled = () => visibled;
getMarkupType = () => markup_type;

setPriceID = (newValue) => id = newValue;
setPercent = (newValue) => percent = newValue;
setAmount = (newValue) => amount = newValue;
setVisibled = (newValue) => visibled = newValue;
setMarkupType = (newValue) => markup_type = {
  ...newValue
};

getCurrentPriceMarkup = () => {
  return {
    priceID: getPriceID(),
    percent: getPercent(),
    amount: getAmount(),
    markup_type: getMarkupType(),
    visibled: getVisibled(),
  }
}

wrappJSONtoArray = (jsonData) => {
  const array = [];
  jsonData.data.map(element => {
    const priceObject = wrappingJSONtoPriceMarkup(element)
    array.push(priceObject);
  })
  return array;
}

wrappingJSONtoPriceMarkup = (jsonData) => {
  setMarkupType(jsonData.markup_type)
  setPriceID(jsonData.id)
  setPercent(jsonData.percent)
  setAmount(jsonData.amount)
  setVisibled(jsonData.visibled)
  return getCurrentPriceMarkup();
}

export default priceMarkupState = {
  initialData,
  getCurrentPriceMarkup,
  setAmount,
  setMarkupType,
  setPercent,
  setPriceID,
  setVisibled,
  wrappJSONtoArray,
  wrappingJSONtoPriceMarkup
}
