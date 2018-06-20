import { APP_ACTION } from '../utils/constant';

const updateStatusNetwork = (isConnected) => ({
  type: APP_ACTION.NETWORK_CHANGED,
  isConnected,
});

const backActionToPreviousPage = (currentPage) => ({
  type: APP_ACTION.REQUEST_BACK,
  currentPage,
})

export default appAction = {
  updateStatusNetwork,
  backActionToPreviousPage,
}