import { all, takeEvery, put, call } from 'redux-saga/effects';
import { localDataName, createDemoData, removePost } from './config';
import actions from './actions';

export function* getPost() {
  const result = yield call(createDemoData)
  console.log(result, '?>?result');
  yield put({
    type: actions.UPDATE_POST,
    posts: result,
  });
}
export function* deletePostSaga({ id }) {
  yield call(removePost, id)
  yield put({
    type: actions.DELETE_POST_SUCCESS
  });
}
export function* updatePostSaga({ posts, post }) {
  yield localStorage.setItem(localDataName, JSON.stringify(posts));
  yield put({
    type: actions.UPDATE_POST,
    posts,
    post,
  });
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_POST, getPost),
    yield takeEvery(actions.UPDATE_POST_SAGA, updatePostSaga),
    yield takeEvery(actions.DELETE_POST_REQUEST, deletePostSaga),
  ]);
}
