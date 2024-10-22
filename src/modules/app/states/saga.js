import {
    all, fork,
    put,
    takeLatest
} from "redux-saga/effects";
import { goToPage, requestChangePasswordFail, requestChangePasswordSuccess, setErrorChangePassword, setErrorInformation, startRequestLogoutFail, startRequestLogoutSuccess, startRequestUpdateInformationFail, startRequestUpdateInformationSuccess } from ".";
import { getNotification } from "utils/helper";
import _ from "lodash";
import { removeAuthToken } from "utils/local-storage";
import { getMe } from "modules/auth/api";

function* loadRouteData() {
    yield
}

function* handleActions() {
    yield takeLatest(startRequestUpdateInformationSuccess, function* () {
        getNotification('success', 'Cập nhật thông tin thành công.');
        yield put(getMe());
    })

    yield takeLatest(startRequestUpdateInformationFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.detail
            yield put(setErrorInformation({
                name: _.get(errors, 'name', ''),
                email: _.get(errors, 'email', ''),
                phone: _.get(errors, 'phone', ''),
            }));
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            getNotification('error', (message ? message : 'Thông tin không hợp lệ.'));
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(requestChangePasswordSuccess, function () {
        getNotification('success', 'Thay đổi mật khẩu thành công.')
    })

    yield takeLatest(requestChangePasswordFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.detail
            yield put(setErrorChangePassword({
                currentPassword: _.get(errors, 'password', ''),
                password: _.get(errors, 'new_password', ''),
            }));
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            const errors = action.payload.data.detail;
            if (errors) {
                yield put(setErrorChangePassword({
                    currentPassword: _.get(errors, 'password', ''),
                    password: _.get(errors, 'new_password', ''),
                }));
            } else {
                getNotification('error', (message ? message : 'Thông tin không hợp lệ.'));
            }
        } else {
            getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });
    yield takeLatest(startRequestLogoutSuccess, function* () {
        window.location.reload()
        removeAuthToken();
        yield put(goToPage({path: "/login"}))
        getNotification('success', 'Đăng xuất thành công.');
    });

    yield takeLatest(startRequestLogoutFail, function () {
        getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });
}

export default function* appSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
