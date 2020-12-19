import { createStore, applyMiddleware, compose} from "redux";
import { composeWithDevTools } from 'remote-redux-devtools';
import {persistStore, persistReducer, createMigrate} from "redux-persist";
import storage from 'redux-persist/lib/storage';
// import storage from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {BASE_URL} from "../constants";
import migrations from './migrations';
import affordabilityReducer from './reducers/affordabilityReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  storage,
  version: 0,
  key: "root",
  migrate: createMigrate(migrations),
  // whitelist: ['auth' , 'earnings', 'currentUser', 'properties']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  // rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({baseUrl: BASE_URL})))
);

export const persistedStore = persistStore(store);
export default store;
