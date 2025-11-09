import { SEND_USER_REQUEST, RECEIVE_USER_RESPONSE, RECEIVE_USER_ERROR } from "./userTypes";

const userInit = {
  loading: false,
  data: [],
  error: ''
};

const userReducer = (state = userInit, action) => {
  switch (action.type) {
    case SEND_USER_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_USER_RESPONSE:
      return { ...state, loading: false, data: action.payload, error: '' };
    case RECEIVE_USER_ERROR:
      return { ...state, loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default userReducer;
