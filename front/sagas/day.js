import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';


import {
    ADD_DAY_FAILURE,
    ADD_DAY_REQUEST,
    ADD_DAY_SUCCESS,

} from '../reducers/day';


function adddayAPI(data) {
    return axios.post('/day', data); //data.dateInfo
}

function* addday(action) {
    try {
        yield call(adddayAPI, action.data);
        yield put({
            type: ADD_DAY_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_DAY_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAddDay() {
    yield takeLatest(ADD_DAY_REQUEST, addday);
}
export default function* daySaga() {
    yield all([
        fork(watchAddDay),
    ]);
}