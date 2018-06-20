let userId = '';
let client_id = '';
let token = null;
let refresh = null;

initialData = () => {
  return {
    userId: '',
    client_id: '',
    token: updateToken(null),
    refresh: updateRefreshToken(null),
  }
}

updateToken = (newToken) => { token = newToken }
updateRefreshToken = (newValue) => { refresh = newValue }
updateUserId = (newvalue) => userId = newvalue;

getToken = () => token;
getRefresh = () => refresh;
getUserId = () => userId;

getCurrentState = () => {
  return {
    userId: getUserId(),
    client_id: '',
    token: getToken(),
    refresh: getRefresh(),
  }
}

// WRAP JSON TO OBJECT

wrappJSONToTokenUserObject = (jsonObject) => {
  updateToken(jsonObject.access_token);
  updateRefreshToken(jsonObject.refresh_token);
}

wrappJSONToUserObject = (jsonData) => {
  updateUserId(jsonData.data.id)
}

export default userState = {
  userId,
  client_id,
  token: getToken(),
  refresh: getRefresh(),
  initialData,
  getCurrentState,
  wrappJSONToTokenUserObject,
  wrappJSONToUserObject,
}