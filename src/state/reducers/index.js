import { combineReducers } from "redux";
import authReducer from './authReducer'
import loggedinReducer from './loggedinReducer';
import emailReducer from './emailReducer';
import myPrdReducer from './myPrdReducer';
import advertiserReducer from './advertiserReducer';
import influencerReducer from './influencerReducer';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["auth", "loggedin", "myprd", "advertiser", "influencer" ]
}

const reducers = combineReducers({
    auth: authReducer,
    loggedin: loggedinReducer,
    emailcheck: emailReducer,
    myprd: myPrdReducer,
    advertiser: advertiserReducer,
    influencer: influencerReducer
})


export default persistReducer(persistConfig,reducers);