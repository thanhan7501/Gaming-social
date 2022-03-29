import isAuthenticatedReducer from "./isAuthenticatedSlice";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
})

export default rootReducer