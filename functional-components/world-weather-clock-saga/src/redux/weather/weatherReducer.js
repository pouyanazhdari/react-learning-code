// src/redux/weather/weatherReducer.js
import {
  SEND_WEATHER_REQUEST,
  RECEIVE_WEATHER_RESPONSE,
  RECEIVE_WEATHER_ERROR,
  SET_WEATHER_STATUS,
} from "./weatherType";

const initialState = {
  data: {},
  error: "",
  weatherStatus: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_WEATHER_REQUEST:
      return { ...state, error: "", weatherStatus: null };

    case RECEIVE_WEATHER_RESPONSE:
      return {
        ...state,
        data: action.payload,
        error: "",
      };

    case RECEIVE_WEATHER_ERROR:
      return {
        ...state,
        data: {},
        error: action.payload,
        weatherStatus: null,
      };

    case SET_WEATHER_STATUS:
      return {
        ...state,
        weatherStatus: action.payload,
      };

    default:
      return state;
  }
};

export default weatherReducer;