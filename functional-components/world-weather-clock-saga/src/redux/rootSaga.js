import { all } from "redux-saga/effects";
import { weatherSaga } from "./weather/weatherSaga";
import { countriesSaga } from "./countries/countriesSaga";

export default function* rootSaga() {
  yield all([
    weatherSaga(),
    countriesSaga(),
  ]);
}
