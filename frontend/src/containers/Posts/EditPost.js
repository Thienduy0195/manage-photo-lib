import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { EditTable } from '@iso/components/Invoice/InvoiceTable';
import OrderStatus from '@iso/components/Invoice/OrderStatus';
import notification from '@iso/components/Notification';
import Button from '@iso/components/uielements/button';
import Input, { Textarea } from '@iso/components/uielements/input';
import DatePicker from '@iso/components/uielements/datePicker';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PostPageWrapper from './SinglePost.styles';
import { stringToPosetiveInt } from '@iso/lib/helpers/utility';
import { orderStatusOptions } from './config';
import postActions from '@iso/redux/posts/actions';

const { updatePost, editPost } = postActions;
const updateValues = invoice => {
  const { invoiceList } = invoice;
  let subTotal = 0;
  invoiceList.forEach((item, index) => {
    const price = item.costs * item.qty;
    invoice.invoiceList[index].price = price;
    invoice.invoiceList[index].key = index + 1;
    subTotal += price;
  });
  invoice.subTotal = subTotal;
  invoice.vatPrice = Math.floor(invoice.vatRate * subTotal * 0.01);
  invoice.totalCost = invoice.vatPrice + subTotal;
  return invoice;
};
const checkPost = invoice => {
  const emptyKeys = [
    'number',
    'billTo',
    'billToAddress',
    'billFrom',
    'billFromAddress',
    'currency',
  ];
  const emptyKeysErrors = [
    'Post Number',
    'Bill To',
    'Bill To Address',
    'Bill From',
    'Bill From Address',
    'Currency',
  ];
  for (let i = 0; i < emptyKeys.length; i++) {
    if (!invoice[emptyKeys[i]]) {
      return `Please fill in ${emptyKeysErrors[i]}`;
    }
  }
  for (let i = 0; i < invoice.invoiceList.length; i++) {
    if (!invoice.invoiceList[i].itemName) {
      return `Please fill in item name of ${i + 1} item`;
    }
    if (invoice.invoiceList[i].costs === 0) {
      return `cost of ${i + 1} item should be positive`;
    }
    if (invoice.invoiceList[i].qty === 0) {
      return `quantity of ${i + 1} item should be positive`;
    }
  }
  return '';
};

export default function(props) {
  const dispatch = useDispatch();
  const { editablePost, isNewPost, redirectPath, toggleView } = props;
  const onSave = () => {
    const error = checkPost(editablePost);
    if (error) {
      notification('error', error);
    } else {
      const successMessage = isNewPost
        ? 'A new Post added'
        : 'Post Updated';
      notification('success', successMessage);
      dispatch(updatePost(editablePost));
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    const data = {
      ...editablePost,
      [name]: value,
    };
    dispatch(editPost(data));
  }
  return (
    <LayoutWrapper>
      <Box>
        <PostPageWrapper className="editView">
          <div className="PageHeader">
            {isNewPost ? (
              <Link to={redirectPath}>
                <Button color="primary">
                  <span>Cancel</span>
                </Button>
              </Link>
            ) : (
              <Button onClick={() => toggleView(false)}>
                <span>Cancel</span>
              </Button>
            )}

            <Button type="primary" onClick={onSave} className="saveBtn">
              <span>Save</span>
            </Button>
          </div>
          <div className="PageContent">
            <div className="OrderInfo">
              <div className="LeftSideContent">
                <h3 className="Title">Post Info</h3>
                <Input
                  placeholder="Number"
                  name="number"
                  value={editablePost.number}
                  onChange={handleChange}
                  className="LeftSideContentInput"
                />
              </div>
              <div className="RightSideContent">
                <div className="RightSideStatus">
                  <span className="RightSideStatusSpan">Order Status: </span>
                  <OrderStatus
                    value={editablePost.orderStatus}
                    name="orderStatus"
                    onChange={handleChange}
                    orderStatusOptions={orderStatusOptions}
                    className="RightStatusDropdown"
                  />
                </div>
                <div className="RightSideDate">
                  Order date:{' '}
                  <DatePicker
                    allowClear={false}
                    value={moment(new Date(editablePost.orderDate))}
                    onChange={val => {
                      editablePost.orderDate = val.toDate().getTime();
                      dispatch(editPost(editablePost));
                    }}
                    format="MMMM Do YYYY"
                    animateYearScrolling={true}
                  />
                </div>
              </div>
            </div>
            <div className="BillingInformation">
              <div className="LeftSideContent">
                <Input
                  placeholder="Bill From"
                  value={editablePost.billFrom}
                  name="billForm"
                  onChange={handleChange}
                  className="BillFormTitle"
                />
                <Textarea
                  placeholder="Bill From Address"
                  value={editablePost.billFromAddress}
                  rows={5}
                  name="billFromAddress"
                  onChange={handleChange}
                  className="BillFormAddress"
                />
              </div>
              <div className="RightSideContent">
                <Input
                  placeholder="Bill To"
                  value={editablePost.billTo}
                  name="billTo"
                  onChange={handleChange}
                  className="BillFormTitle"
                />
                <Textarea
                  placeholder="Bill To Address"
                  value={editablePost.billToAddress}
                  rows={5}
                  name="billToAddress"
                  onChange={handleChange}
                  className="BillFormAddress"
                />
              </div>
            </div>

            <div className="PostTable editInvoiceTable">
              <EditTable
                editableInvoice={editablePost}
                editInvoice={e => dispatch(editPost(e))}
                updateValues={updateValues}
              />
              <div className="InvoiceTableBtn">
                <Button
                  onClick={() => {
                    editablePost.invoiceList.push({
                      key: editablePost.invoiceList.length + 1,
                      itemName: '',
                      costs: 0,
                      qty: 0,
                      price: 0,
                    });
                    dispatch(editPost(editablePost));
                  }}
                  type="primary"
                >
                  Add Item
                </Button>
              </div>
              <div className="TotalBill">
                <p>
                  <span className="TotalBillTitle">Sub-total : </span>
                  <span>{`${editablePost.currency}${editablePost.subTotal}`}</span>
                </p>
                <div className="vatRateCalc">
                  <span className="vatRateCalcSpan"> Total Vat : </span>
                  <div className="vatRateCalcWrap">
                    <Input
                      value={editablePost.vatRate}
                      addonAfter="%"
                      onChange={event => {
                        editablePost.vatRate = stringToPosetiveInt(
                          event.target.value,
                          editablePost.vatRate
                        );
                        dispatch(editPost(updateValues(editablePost)));
                      }}
                    />

                    <span>
                      {`${editablePost.currency}${editablePost.vatPrice}`}
                    </span>
                  </div>
                </div>
                <div className="currencySignWithTotal">
                  <span className="grandTotalSpan">Grand Total </span>
                  <div className="currencySignWrap">
                    <Input
                      value={editablePost.currency}
                      onChange={handleChange}
                      name="currency"
                      className="currencySign"
                    />
                    <span className="currencySignSpan">
                      {editablePost.totalCost}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ButtonWrapper" />
          </div>
        </PostPageWrapper>
      </Box>
    </LayoutWrapper>
  );
}
