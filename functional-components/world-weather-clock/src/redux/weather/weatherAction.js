import axios from 'axios';
import { SEND_WEATHER_REQUEST, RECEIVE_WEATHER_ERROR, RECEIVE_WEATHER_RESPONSE, SET_WEATHER_STATUS } from './weatherType';

export const sendWeatherRequest = () => {
    return {
        type: SEND_WEATHER_REQUEST
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
export const getWeatherStatus = (latlng) => {
    return async (dispatch) => {
        if (!latlng || !Array.isArray(latlng) || latlng.length < 2) {
            dispatch(receiveWeatherError("مختصات معتبر نیست"));
            return;
        }
        dispatch(sendWeatherRequest());

        const [LAT, LNG] = latlng;
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,precipitation&timezone=auto&temperature_unit=celsius`;

            const res = await axios.get(url, {
                headers: { "Content-Type": "application/json" },
            });

            dispatch(receiveWeatherResponse(res.data));
            dispatch(setWeatherStatus(res.data))

        } catch (error) {
            dispatch(receiveWeatherError("خطا در ارتباط با سرور"));
        }
    };
}