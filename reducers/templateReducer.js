import templateState from '../objects/templateState';
import { APP_ACTION } from '../utils/constant';

handlerTemplate = (state = templateState.initialData(), action) => {
  switch (action.type) {
    case APP_ACTION.REQUEST_GET_TEMPLATE_SUCCESS:
      return {
        ...state,
        ...templateState.setCurrentTemplate(action.template),
      }
    default:
      return state;
  }
}
export default handlerTemplate;