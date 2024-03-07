import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"
import { devToolsEnhancer } from "@redux-devtools/remote";
import reducer from "./rootReducer";
import { isDev } from "lib/utils";

const reduxStore = configureStore({
  reducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(thunk), 
  devTools: false,
  enhancers: (getDefaultEnchancers) =>
    getDefaultEnchancers().concat(devToolsEnhancer({ port: 8081 })),
});

declare global {
  interface Window {
    reduxStore: typeof reduxStore;
  }
}

window.reduxStore = reduxStore;

const { reduxStore: store } = isDev
  ? { reduxStore }
  : overwolf.windows.getMainWindow();

export type AppDispatch = typeof store.dispatch;
export default store;
