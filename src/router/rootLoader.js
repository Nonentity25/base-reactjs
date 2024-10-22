import {redirect} from "react-router-dom";
import store from "../states/configureStore.js";
import {convertQueryStringToObject, hasPermission} from "../utils/helper.js";
import {getAuthToken} from "../utils/local-storage.js";
import {setLocation} from "../modules/app/states/index.js";
import { initialSaga } from "../states/routing/index.js";
import { getMe } from "modules/auth/api/index.js";


export const rootLoader = async ({request, params}, requiredAuth, saga = null, permissions = []) => {
  const url = new URL(request.url);
  let { auth } = store.getState();
  const firstCondition = !auth.isAuthSuccess && getAuthToken();
  const secondCondition = url.pathname === '/profile';

  if (firstCondition || secondCondition) {
    await store.dispatch(getMe());
    auth = store.getState().auth;
  }

  if(requiredAuth){

    if (auth.isAuthSuccess) {
      if(permissions.length > 0 && !hasPermission(permissions)){
        return redirect('/403');
      }
    }else {
      return redirect('/login');
    }
  } 

  let query = {...(url.search ? convertQueryStringToObject(url.search) : {})};
 
  store.dispatch(setLocation({
    pathName: url.pathname,
    prevPathName: store.getState().app.location.pathName,
    params: { ...params },
    query: query
  }))

  if (saga) {
    await store.dispatch(initialSaga(saga));
  }

  return null;
}
