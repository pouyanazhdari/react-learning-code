import { combineReducers } from "redux";
import foodReducer from "./food/foodReducer";
import fruitReducer from "./fruit/fruitReducer";

const rootReducer = combineReducers({
    food: foodReducer,
    fruit: fruitReducer
})

export default rootReducer;