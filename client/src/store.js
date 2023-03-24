import { applyMiddleware, createStore } from "redux";
import rootReducers from "./reducers";
import reduxthunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(reduxthunk))
);

export default store;
