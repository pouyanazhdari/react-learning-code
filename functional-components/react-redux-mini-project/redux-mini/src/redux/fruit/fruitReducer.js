import { Buy_Apple, Buy_Orange } from "./fruitsType";

const initialState = {
    apple: 10,
    orange: 15
};

const fruitReducer = (state = initialState, action) => {
    switch (action.type) {
        case Buy_Apple:
            return { ...state, apple: state.apple - 1 };

        case Buy_Orange:
            return { ...state, orange: state.orange - 1 };

        default:
            return state;
    }
};

export default fruitReducer;
