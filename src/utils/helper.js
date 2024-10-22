import { notification } from "antd";
import store from "../states/configureStore";

export const convertQueryStringToObject = (queryString) => {
    if (queryString.charAt(0) === '?') {
        queryString = queryString.substring(1);
    }

    var pairs = queryString.split('&');
    var result = {};

    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1] || '');

        if (Object.prototype.hasOwnProperty.call(result, key)) {
            if (!Array.isArray(result[key])) {
                result[key] = [result[key]];
            }

            result[key].push(value);
        } else {
            result[key] = value;
        }
    }

    return result;
}

export const hasPermission = (permissions) => {
    let { auth } = store.getState();
    let isPermission = false;
    if (permissions) {
        permissions.forEach(permission => {
            if (
                auth.authUser &&
                auth.authUser.permissions &&
                (
                    auth.authUser.permissions.includes(permission)
                )
            ) {
                isPermission = true
            }
        })
    }

    return isPermission;
} 


export const getNotification = (type, description,  message = '') => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  

