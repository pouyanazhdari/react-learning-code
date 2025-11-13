// src/redux/store.js
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { weatherSaga } from "./weather/weatherSaga";
import { countriesSaga } from "./countries/countriesSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(weatherSaga);
sagaMiddleware.run(countriesSaga);

export default store;