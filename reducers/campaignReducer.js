import campaignState from '../objects/campaignState';
import { APP_ACTION } from '../utils/constant';
function handleCampaign(state = campaignState.initialData(), action) {
  switch (action.type) {
    case APP_ACTION.REQUEST_CAMPAIGN_NAME_SUCCESS:
      const currentState = action.campaign;
      return {
        ...state,
        ...currentState,
      }
    default:
      return state;
  }
}

export default handleCampaign;