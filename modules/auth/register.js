import {createAction, handleActions} from 'redux-actions';
import {call, delay, put, takeLatest, select, throttle} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios';
const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}
export const initialState = {
    isRegistered : false
}

const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE'
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
const UNREGISTER_REQUEST = 'auth/UNREGISTER_REQUEST';
const UNREGISTER_FAILURE = 'auth/UNREGISTER_FAILURE'
const UNREGISTER_SUCCESS = 'auth/UNREGISTER_SUCCESS'

export const registerRequest = createAction(REGISTER_REQUEST, data => data)
export const unregisterRequest = createAction(UNREGISTER_REQUEST, data => data)


export function* registerSaga() {
    yield takeLatest(REGISTER_REQUEST, signup);
    yield takeLatest(UNREGISTER_REQUEST, withdrawl);

    }

function* signup(action) {
    try{
        console.log(" 핵심 " + JSON.stringify(action))
        const response = yield call (registerApi, action.payload)
        alert(JSON.stringify(response.data))
        const newUser = yield response.json()
        yield put({type: REGISTER_SUCCESS, payload: response.data})
        yield put(window.location.href = "../pages/auth/login")
    }catch(error){
        yield put({type: REGISTER_FAILURE, payload: error.message})
    }
}
function* withdrawl(action) {
    try{
        const response = yield call (userRegisterApi)
        console.log("회원가입 서버 다녀옴 " + JSON.stringify(response.data))
        yield put({type: UNREGISTER_SUCCESS, payload: response.data})
    }catch(error){
        yield put({type: UNREGISTER_FAILURE, payload: error.message})
    }
}
const registerApi = payload => 
     axios.post(
        `${SERVER}/user/join`, // 백단 코드
        payload,
        {headers}
    )

const register = handleActions({
    [HYDRATE] : (state, action) => ({
        ...state, ...action.payload
    })
} , initialState)

/** handleAction을 사용하기전 학습용 백업
const USER_LOGIN = 'auth/USER_LOGIN';
export const userLogin = createAction(USER_LOGIN);
function* userLogin(action) {
    try{
        const response = yield fetch()
        const loginUser = yield response.json()
        yield put(loginUser.data)
    }catch(error){
        yield put()
    }
    console.log(`현재 값은 입니다.`);
}
export function* watchUserLogin() {
    yield takeLatest(USER_LOGIN, userLogin);
  }
*/
/** 
const auth = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log(' ### HYDRATE Issue 발생 ### ')
            return {
                ...state,
                ...action.payload
            }
        case USER_REGISTER_SUCCESS:
            console.log(' ### 회원가입 성공 ### ' + action.payload)
            return {
                ...state,
                user: action.payload
            }
        case USER_REGISTER_FAILURE:
            console.log(' ### 회원가입 실패 ### ' + action.payload)
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}
*/

export default register