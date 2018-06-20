import { Animated } from 'react-native'
import { put } from 'redux-saga/effects';
import moment from 'moment';

import { ERROR_CODE, APP_ACTION } from './constant';
import ErrorObject from '../objects/errorObject';

// STRING HELPER
function isSpecialCharacter(str) {
  return !/[~`!#$%@\^&*+=\-\[\]\\';,/{}()|\\":<>\?]/g.test(str);
}

function isNumericAndLetterCharacter(str) {
  if (str !== "") {
    return /^[0-9a-zA-Z]+$/g.test(str);
  } else {
    return true;
  }
}

export const StringHelper = {
  isSpecialCharacter,
  isNumericAndLetterCharacter,
}

// DATE TIME HELPER
function setFormatDateTimeByString(formatString, dateTime) {
  try {
    const result = moment(dateTime).format(formatString)
    return result;
  } catch (error) {
    return dateTime;
  }
}

export const DateTimeHelper = {
  setFormatDateTimeByString,
}

// NUMBER HELPER
function getPriceNumberFromString(stringValue) {
  const number = parseFloat(stringValue.replace('$', ''))
  return isNaN(number) ? null : parseFloat(Math.round(number * 100) / 100).toFixed(2);
}

function setFormatCostNumber(numberValue) {
  return isNaN(numberValue) ? null : parseFloat(Math.round(numberValue * 100) / 100).toFixed(2);
}

export const NumberHelper = {
  getPriceNumberFromString,
  setFormatCostNumber,
}

// ANIMATION HELPER
function initializeAnimation(defaultValue, toValue, duration, easing, delay = 0) {
  return Animated.timing(
    defaultValue,
    {
      toValue,
      duration,
      easing,
      delay,
    }
  )
}

export const AnimationHelper = {
  initializeAnimation,
}

// HANLER EXCEPTION HELPER
function createErrorObject(code, message) {
  return ErrorObject.initial(code, message);
}

function handlerException(error, type, message) {
  console.log("ERROR", error, type);
  const state = {
    isRequesting: false,
    success: false,
    isFailure: true,
    errorMessage: error.message,
  }
  switch (error.code) {
    case ERROR_CODE.REQUEST_TIME_OUT:
      return { type: APP_ACTION.REQUEST_TIME_OUT, state, };
    default:
      return { type: type, state };
  }
}

export const HandlerException = {
  createErrorObject,
  handlerException,
}