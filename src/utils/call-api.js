import axios from "axios";
import {isFunction} from 'lodash';
import { setAuthSuccess } from "modules/auth/states";
import { goToPage } from "modules/app/states";
import { getAuthToken, removeAuthToken } from "./local-storage";

export default async function callApi({
  method,
  apiPath,
  actionTypes: [requestType, successType, failureType],
  variables,
  metaData,
  dispatch,
  getState,
  headers,
  responseType
}) {
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error('callGraphQLApi requires dispatch and getState functions');
  }

  const baseUrlApi = process.env.REACT_APP_API_URL;
  const token = getAuthToken();
  const header = {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
  dispatch(requestType())
  return axios({
    baseURL: baseUrlApi,
    headers: headers ? { ...header, ...headers } : header,
    method: method,
    url: apiPath,
    data: variables,
    params: method === 'get' ? variables : '',
    responseType: responseType,
  })
    .then(function (response) {
      dispatch(successType({ ...response.data, meta: { variables, ...metaData } }))
      return response.data;
    })
    .catch((error) => {
      let response = error.response ? error.response : error;
      dispatch(failureType({
        meta: { variables, ...metaData }, payload: error.response
      }));
      if (response.status === 401) {
        removeAuthToken()
        dispatch(goToPage({ path: '/login' }));
        dispatch(setAuthSuccess(false))
      } else if (response.status === 403) {
        dispatch(goToPage({ path: '/' }));
      }
      return {
        errorCode: response.status,
        errorMessage: response.statusText
      };
    })
}
