let campaignID = ''
let code = ''
let name = ''
let campaignType = {
  id: '',
  name: '',
  description: '',
  visibled: false,
}
let startDate = ''
let endDate = ''
let notes = ''
let status = ''

initialData = () => {
  return {
    campaignID: '',
    code: '',
    name: '',
    campaignType: {
      id: '',
      name: '',
      description: '',
      visibled: false,
    },
    startDate: '',
    endDate: '',
    notes: '',
    status: '',
  }
}

setCampaignID = (newValue) => {
  campaignID = newValue
};
setCampaignName = (newValue) => {
  name = newValue
};
setCampaignCode = (newValue) => {
  code = newValue
};
setCampaignType = (newValue) => {
  campaignType = {...newValue}
};
setCampaignStatus = (newValue) => {
  status = newValue
};
setStartDate = (newValue) => {
  startDate = newValue
}
setEndDate = (newValue) => {
  endDate = newValue
}
setNote = (newValue) => {
  notes = newValue !== null ? newValue:''
}

getCampaignID = () => campaignID;
getCampaignName = () => name;
getCampaignCode = () => code;
getCampaignType = () => campaignType;
getCampaignStatus = () => status;
getStartDate = () => startDate;
getEndDate = () => endDate;
getNote = () => notes

getCurrentState = () => {
  return {
    campaignID: getCampaignID(),
    code: getCampaignCode(),
    name: getCampaignName(),
    campaignType: getCampaignType(),
    startDate: getStartDate(),
    endDate: getEndDate(),
    notes: getNote(),
    status: getCampaignStatus(),
  }
}
// WRAP JSON DATA TO OBJECT
wrapJSONToCampaign = (jsonObject) => {
  const data = jsonObject.data
  setCampaignCode(data.code);
  setCampaignID(data.id);
  setCampaignName(data.name);
  setCampaignType(data.campaign_type);
  setCampaignStatus(data.status);
  setStartDate(data.start_date);
  setEndDate(data.end_date);
  setNote(data.notes);
  return getCurrentState();
}

export default campaignState = {
  campaignID: getCampaignID(),
  code: getCampaignCode(),
  name: getCampaignName(),
  campaignType: getCampaignType(),
  startDate: getStartDate(),
  endDate: getEndDate(),
  notes: getNote(),
  status: getCampaignStatus(),
  initialData,
  getCurrentState,
  wrapJSONToCampaign,
}