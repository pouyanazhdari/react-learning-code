import { SEND_WEATHER_REQUEST, RECEIVE_WEATHER_ERROR, RECEIVE_WEATHER_RESPONSE, SET_WEATHER_STATUS } from './weatherType';
const weatherInit = {
    data: {},
    error: '',
    weatherStatus:null
}

const weatherReducer = (state = weatherInit, action) => {
    switch (action.type) {
        case SEND_WEATHER_REQUEST:
            return state
        case RECEIVE_WEATHER_RESPONSE:
            return {
                ...state,
                data: action.payload,
                error: '',
            }
        case RECEIVE_WEATHER_ERROR:
            return {
                ...state,
                data: {},
                error: action.payload,

            }
        case SET_WEATHER_STATUS:
            return {
                ...state,
                weatherStatus:action.payload
            }
        default:
            return state
    }
}

export default weatherReducer
