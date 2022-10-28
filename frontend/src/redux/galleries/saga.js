import { all, takeEvery, put, call } from 'redux-saga/effects';
import { localDataName, createDemoData, removeGallery } from './config';
import actions from './actions';

export function* getGallery() {
  const result = yield call(createDemoData)
  yield put({
    type: actions.UPDATE_GALLERY,
    galleries: result,
  });
}
export function* deleteGallerySaga({ id }) {
  yield call(removeGallery, id)
  yield put({
    type: actions.DELETE_GALLERY_SUCCESS
  });
}
export function* updateGallerySaga({ galleries, gallery }) {
  yield localStorage.setItem(localDataName, JSON.stringify(galleries));
  yield put({
    type: actions.UPDATE_GALLERY,
    galleries,
    gallery,
  });
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_GALLERY, getGallery),
    yield takeEvery(actions.UPDATE_GALLERY_SAGA, updateGallerySaga),
    yield takeEvery(actions.DELETE_GALLERY_REQUEST, deleteGallerySaga),
  ]);
}
