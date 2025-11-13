import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { SEND_WEATHER_REQUEST } from "./weatherType";
import {
  receiveWeatherResponse,
  receiveWeatherError,
  setWeatherStatus  // اضافه شد!
} from "./weatherAction";

const fetchWeatherData = async (latlng) => {
  if (!latlng || !Array.isArray(latlng) || latlng.length < 2) return null;
  const [lat, lng] = latlng;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,precipitation&timezone=auto&temperature_unit=celsius`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

function* handleGetWeather(action) {
  try {
    const data = yield call(fetchWeatherData, action.payload);
    if (data) {
      yield put(receiveWeatherResponse(data));
      yield put(setWeatherStatus(data));
    }
  } catch (error) {
    yield put(receiveWeatherError("خطا در دریافت آب و هوا"));
  }
}

export function* weatherSaga() {
  yield takeEvery(SEND_WEATHER_REQUEST, handleGetWeather);
}