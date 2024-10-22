import {
    all, fork, takeLatest, put
} from "redux-saga/effects";

import { setDataLogin, startRequestLoginFail, startRequestLoginSuccess } from ".";
import { goToPage } from "modules/app/states";
import { setAuthToken } from "utils/local-storage";

function* loadRouteData() {

}


function* handleActions() {
    yield takeLatest(startRequestLoginSuccess, function* (action) {
        window.location.reload()
        let token = action.payload.data.access_token;
        setAuthToken(token);
        yield put(setDataLogin({
            email: '',
            password: ''
        }))
        yield put(goToPage({
            path: "/"
        }))
    });

    yield takeLatest(startRequestLoginFail, function () {
        //   let statusError = action.payload.payload.status;
        //   if (statusError === 400) {
        //     let errors = action.payload.payload.data.errors
        //     // yield put(setErrorEmailLogin(errors.email[0]))
        //   } else if (statusError === 401) {
        //     let message = _.get(action,'payload.payload.data.message','')
        //     getNotification('error', (message? message : "Thông tin email hoặc mật khẩu không chính xác."));
        //   } else {
        //     getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
        //   }
    });

    

}

export default function* loadAuthSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
