
import callApi from "utils/call-api";
import {
  startRequestGetMe, startRequestGetMeFail, startRequestGetMeSuccess,
  startRequestLogin, startRequestLoginFail, startRequestLoginSuccess,

} from "../states";
import { 
  startRequestLogout, startRequestLogoutFail, startRequestLogoutSuccess,
  startRequestChangePassword, requestChangePasswordFail, requestChangePasswordSuccess,
  startRequestUpdateInformation, startRequestUpdateInformationFail, startRequestUpdateInformationSuccess
 } from "modules/app/states";

export const login = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `/auth/login`,
    actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
    variables: {
      email: data.email,
      password: data.password,
    },
    dispatch,
    getState
  })
}

export const getMe = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `/auth/me`,
    actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
    variables: {},
    dispatch,
    getState
  })
}

export const logout = () => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `/auth/logout`,
    actionTypes: [startRequestLogout, startRequestLogoutSuccess, startRequestLogoutFail],
    variables: {},
    dispatch,
    getState
  })
}

export const changePassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `/auth/change-password`,
    actionTypes: [startRequestChangePassword, requestChangePasswordSuccess, requestChangePasswordFail],
    variables: {
      password: data.currentPassword,
      new_password: data.password,
    },
    dispatch,
    getState
  })
}

export const updateProfile = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `/auth/me`,
    actionTypes: [startRequestUpdateInformation, startRequestUpdateInformationSuccess, startRequestUpdateInformationFail],
    variables: data,
    dispatch,
    getState
  })
}


