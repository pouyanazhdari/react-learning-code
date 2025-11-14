import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";
import axios from "axios";
import { SEND_COUNTRIES_REQUEST } from "./countriesType";
import {
    receiveCountriesError,
    receiveCountriesResponse,
} from "./countriesAction";

const fetchCountriesData = async () => {
    const url = "https://restcountries.com/v3.1/all?fields=name,cca2,flags,capital,latlng";
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
};

function* handleCountries(action) {
    try {
        const data = yield call(fetchCountriesData);
        yield put(receiveCountriesResponse(data));
    } catch (error) {
        yield put(receiveCountriesError("خطا ارتباط با سرور"));
    }
}

export function* countriesSaga() {
    yield takeLatest(SEND_COUNTRIES_REQUEST, handleCountries);
}
