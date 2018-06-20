import { APP_ACTION } from "../utils/constant";


const requestCampaignName = (user) => ({
  type: APP_ACTION.REQUEST_CAMPAIGN_NAME,
  user,
});

const getTemplate = (campaignId, token) => ({
  type: APP_ACTION.REQUEST_GET_TEMPLATE,
  campaignId,
  token,
})

export default campaignAction = {
  requestCampaignName,
  getTemplate,
}