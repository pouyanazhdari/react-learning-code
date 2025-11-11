import { RECEIVE_COUNTRIES_ERROR,RECEIVE_COUNTRIES_RESPONSE,SEND_COUNTRIES_REQUEST } from "./countriesType"; 
const countriesInit = {
    data: [],
    error: ''
}

const countriesReducer = (state = countriesInit,action)=>{
    switch (action.type) {
        case SEND_COUNTRIES_REQUEST:
             return state
        case RECEIVE_COUNTRIES_RESPONSE:
             return {...state,
                data:action.payload,
                error:''
            }    
            case RECEIVE_COUNTRIES_ERROR:
             return {...state,
                data:[],
                error:action.payload
            }
    
        default:
             return state
    }
}

export default countriesReducer
