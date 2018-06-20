import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';

import { APP_ACTION, APP } from '../utils/constant';
import AppNavigatorService from '../utils/navigators/AppNavigatorService';

function* handlerBackButton(action) {
  console.log(action.currentPage);

  switch (action.currentPage) {
    case APP.PRINT_QUOTE:
    case APP.FINAL_QUOTE:
      AppNavigatorService.back()
    default:
      break;
  }
}

export default appMiddleware = {
  handlerBackButton,
}