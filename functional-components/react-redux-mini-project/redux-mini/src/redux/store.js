// src/redux/store.js
import { createStore } from "redux";
import fruitReducer from "./fruit/fruitReducer";
import rootReducer from "./rootreducer";

const store = createStore(rootReducer);

export default store;
