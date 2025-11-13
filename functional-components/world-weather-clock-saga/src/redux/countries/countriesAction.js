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

