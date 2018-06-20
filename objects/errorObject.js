let code = 0;
let message = '';

initial = (newCode, newMessage) => {
  code = newCode;
  message = newMessage;
  return getObject();
}

getObject = () => {
  return {
    code,
    message,
  }
}


export default ErrorObject = {
  code,
  message,
  initial,
}