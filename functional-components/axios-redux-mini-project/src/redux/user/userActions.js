
import { RECEIVE_USER_RESPONSE, SEND_USER_REQUEST, RECEIVE_USER_ERROR } from "./userTypes";
import axios from "axios";


export const sendUserRequest = () => {
    return {
        type: SEND_USER_REQUEST
    }
}

export const receiveUserResponse = (data) => {
    return {
        type: RECEIVE_USER_RESPONSE,
        payload: data
    }
}

export const receiveUserError = (error) => {
    return {
        type: RECEIVE_USER_ERROR,
        payload: error
    }
}
export const getUsers = () => {
    return async (dispatch) => {
        dispatch(sendUserRequest());
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            dispatch(receiveUserResponse(res.data));
        } catch (err) {
            dispatch(receiveUserError(err.message || "خطایی رخ داد"));
        }
    }
}