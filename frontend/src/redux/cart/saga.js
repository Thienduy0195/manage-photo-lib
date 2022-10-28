import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import fake from './fake';
import fakeinitdata from './config';

export function* changedCard() {
  yield takeEvery(actions.CHANGE_CARDS, function*() {});
}
export function* initData() {
  let fakeData = fakeinitdata;
  yield put({
    type: actions.INIT_DATA,
    payload: fakeData,
  });
}
export function* updateData({ products, productQuantity }) {
  localStorage.setItem('cartProductQuantityCustomer', JSON.stringify(productQuantity));
  localStorage.setItem('cartProductsCustomer', JSON.stringify(products));
  yield put({
    type: actions.UPDATE_DATA,
    products,
    productQuantity,
  });
}
export default function*() {
  yield all([
    takeEvery(actions.INIT_DATA_SAGA, initData),
    takeEvery(actions.UPDATE_DATA_SAGA, updateData),
  ]);
}
