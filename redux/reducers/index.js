import { combineReducers } from "redux";
import commonReducers from "./common";
import homeReducers from "./home";
import metaReducer from "./meta";
import profileReducers from "./profile";
const rootReducer = combineReducers({
  meta: metaReducer,
  common: commonReducers,
  home: homeReducers,
  profile: profileReducers,
});

export default rootReducer;
