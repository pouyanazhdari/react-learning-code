import {combineReducers} from "redux"
import countriesReducer from "./countries/countriesReducer"
import weatherReducer from "./weather/weatherReducer"
const rootReducer = combineReducers({
    countries: countriesReducer,
    weather:weatherReducer
})
export default rootReducer