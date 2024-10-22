import {fork, all} from 'redux-saga/effects'
import appSaga from '../../modules/app/states/saga.js';
import routeSaga from '../routing/saga';

export default function* sagas() {
  yield all([
    fork(routeSaga),
    fork(appSaga),
  ]);
}
