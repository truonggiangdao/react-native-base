import userState from '../objects/userState';
import { APP_ACTION } from '../utils/constant';

handlerUser = (state = userState.initialData(), action) => {
  switch (action.type) {
    case APP_ACTION.REQUEST_OAUTH_TOKEN_SUCCESS:
      const currentState = action.user.getCurrentState();
      return {
        ...state,
        ...currentState,
      }
    default:
      return state;
  }
}

export default handlerUser;