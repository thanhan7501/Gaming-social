import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
const persistConfig = {
  key: "user",
  version: 1,
  storage,
  whitelist: ["isAuthenticated"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
