import { applyMiddleware, createStore, compose, Store, combineReducers } from "redux";
import reducer from "./reducer";


// const reduxDevTools =  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
  const appReducer = combineReducers({
    root: reducer
  });
export const store = (): Store => {
  let rootStore = createStore(appReducer, compose(applyMiddleware()))
  return rootStore;
};

export default store;
