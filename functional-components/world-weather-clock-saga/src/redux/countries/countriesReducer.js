import { RECEIVE_COUNTRIES_ERROR, RECEIVE_COUNTRIES_RESPONSE, SEND_COUNTRIES_REQUEST, SET_SELECTED_COUNTRY } from "./countriesType";
const countriesInit = {
    data: [],
    error: '',
    selectedCountry: null 
};

const countriesReducer = (state = countriesInit, action) => {
    switch (action.type) {
        case SEND_COUNTRIES_REQUEST:
            return { ...state, error: '' };

        case RECEIVE_COUNTRIES_RESPONSE:
            return {
                ...state,
                data: action.payload,
                error: '',
                selectedCountry: null
            };

        case RECEIVE_COUNTRIES_ERROR:
            return {
                ...state,
                data: [],
                error: action.payload,
                selectedCountry: null
            };

        case SET_SELECTED_COUNTRY:
            return {
                ...state,
                selectedCountry: action.payload
            };

        default:
            return state;
    }
};

export default countriesReducer;
