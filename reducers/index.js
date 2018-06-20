import { combineReducers } from 'redux';

import apps from './applicationReducer';
import newQuote from './newQuoteReducer';
import user from './userReducer';
import campaign from './campaignReducer';
import template from './templateReducer';

export default combineReducers({
  // add reducers component
  apps,
  campaign,
  newQuote,
  user,
  template,
});
