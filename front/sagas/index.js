import { all, fork } from 'redux-saga/effects';
import planSaga from './plan';
import userSaga from './user';
import daySaga from './day';
import axios from 'axios';

//rootsaga를 만들고 거기에 만들고싶은 비동기action들을 넣어준다
axios.defaults.baseURL = 'http://localhost:3060';
axios.defaults.withCredentials = true; //모든 요청에 withCredentials : true를 해준다.

export default function* rootSaga() { //중단점이 있는 함수
    yield all([ //all은 배열을 받음 > 동시에 실행
        fork(userSaga),
        fork(planSaga),
        fork(daySaga),
    ]);
}