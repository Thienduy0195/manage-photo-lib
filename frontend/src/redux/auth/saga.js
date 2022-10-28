import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';
import { login, getProfile } from './services'

const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    try {
      const { email, password } = payload;
      const response = yield call(login, email, password);
      if (response.status) {
        yield localStorage.setItem('refresh_token', response.data?.refresh_token);
        yield localStorage.setItem('expires_in', response.data?.expires_in);
        yield localStorage.setItem('id_token', response.data?.access_token);
        yield put({
          type: actions.LOGIN_SUCCESS,
          data: response.data,
        });
        const profile = yield call(getProfile);
        yield put({
          type: actions.SET_PROFILE,
          payload: profile
        });
      } else {
        yield put({ type: actions.LOGIN_ERROR });
      }
    } catch (error) {
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* getProfileRequest() {
  yield takeEvery(actions.GET_PROFILE_REQUEST, function* () {
    try {
      const profile = yield call(getProfile);
      yield put(actions.getProfileSuccess(profile));
    } catch (error) {

    }
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () { });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearToken();
    history.push('/admin');
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const access_token = getToken().get('idToken');

    if (access_token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        data: { access_token },
      });
      yield put(actions.getProfileRequest())
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginError),
    fork(logout),
    fork(getProfileRequest)
  ]);
}