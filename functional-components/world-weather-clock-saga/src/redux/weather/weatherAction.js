import axios from 'axios';
import { SEND_WEATHER_REQUEST,
     RECEIVE_WEATHER_ERROR, 
     RECEIVE_WEATHER_RESPONSE,
      SET_WEATHER_STATUS } from './weatherType';

export const sendWeatherRequest = (latlng) => {
    return {
        type: SEND_WEATHER_REQUEST,
        payload: latlng
    }
}
export const receiveWeatherResponse = (data) => {
    return {
        type: RECEIVE_WEATHER_RESPONSE,
        payload: data
    }
}
export const receiveWeatherError = (error) => {
    return {
        type: RECEIVE_WEATHER_ERROR,
        payload: error
    }
}
export const setWeatherStatus = (weatherStatus) => {
    return {
        type: SET_WEATHER_STATUS,
        payload: weatherStatus
    }
}
