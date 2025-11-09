import { Buy_Sandwich } from "./foodType";

const initialState = {
    sandwich: 13,
};

const foodReducer = (state = initialState, action) => {
    switch (action.type) {
        case Buy_Sandwich:
            return { ...state, sandwich: state.sandwich - 1 };
        default:
            return state;
    }
};

export default foodReducer;
