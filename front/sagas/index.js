import { all, fork } from 'redux-saga/effects';

import axios from 'axios'; 

import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3060';
axios.defaults.withCredentials = true; //모든 요청에 withCredentials : true를 해준다.
export default function* rootSaga() {
  yield all([
    fork(userSaga),
  ]);
}