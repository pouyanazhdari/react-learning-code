import { RECEIVE_COUNTRIES_ERROR, RECEIVE_COUNTRIES_RESPONSE, SEND_COUNTRIES_REQUEST, SET_SELECTED_COUNTRY } from "./countriesType"
import axios from 'axios';

export const sendCountriesRequest = () => {
    return {
        type: SEND_COUNTRIES_REQUEST
    }
}
export const receiveCountriesResponse = (data) => {
    return {
        type: RECEIVE_COUNTRIES_RESPONSE,
        payload: data
    }
}
export const receiveCountriesError = (error) => {
    return {
        type: RECEIVE_COUNTRIES_ERROR,
        payload: error
    }
}
export const setSelectedCountry = (country) => {
    return {
        type: SET_SELECTED_COUNTRY,
        payload: country
    }
}
export const getCountries = () => {
    return async (dispatch) => {
        dispatch(sendCountriesRequest());

        try {
            const url = "https://restcountries.com/v3.1/all?fields=name,cca2,flags,capital,latlng";
            const res = await axios.get(url, {
                headers: { "Content-Type": "application/json" },
            });

            if (!res.data || !Array.isArray(res.data)) {
                throw new Error("داده معتبر دریافت نشد");
            }

            dispatch(receiveCountriesResponse(res.data));

        } catch (error) {
            dispatch(receiveCountriesError("خطا در ارتباط با سرور"));
        }
    };
};
