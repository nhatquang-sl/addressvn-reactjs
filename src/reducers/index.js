import { combineReducers } from "redux";

import loading from './loadingReducer';
import address from './addressReducer';

export default combineReducers({
    loading,
    address
});