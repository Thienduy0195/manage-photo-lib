import { all, takeEvery, put, call } from 'redux-saga/effects';
import { localDataName, createDemoData } from './config';
import actions from './actions';
import httpRequest from "@iso/config/httpRequest";

const getData = async () => {
const res =  await httpRequest.get('orders')
return res.data
}

export function* getInvoice() {
  const invoices = yield call(getData)
  yield put({
    type: actions.UPDATE_INVOICE,
    invoices
  });
}
export function* updateInvoiceSaga({ invoices, invoice }) {
  yield localStorage.setItem(localDataName, JSON.stringify(invoices));
  yield put({
    type: actions.UPDATE_INVOICE,
    invoices,
    invoice,
  });
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_INVOICE, getInvoice),
    yield takeEvery(actions.UPDATE_INVOICE_SAGA, updateInvoiceSaga),
  ]);
}
