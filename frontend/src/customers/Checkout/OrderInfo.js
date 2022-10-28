import React from "react";
import { useSelector } from "react-redux";
import { notification } from "antd";
import SingleOrderInfo from "./SingleOrder";
import { useHistory } from "react-router-dom";
import cartAction from '@iso/redux/cart/actions';

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { OrderTable } from "./Checkout.styles";
import axios from "axios";

let totalPrice;

const {
  changeProductQuantity,
} = cartAction;

// This values are the props in the UI
const currency = "USD";
const style = { layout: "vertical" };
const ORDERS = "orders";
const baseUrl =
  process.env.REACT_APP_API_SERVER || "https://localhost:8900/api/v1";
// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  isValid,
  getData,
  productQuantity,
}) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const history = useHistory();
  React.useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={!isValid}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(async () => {
            const values = getData();
            await axios.post(`${baseUrl}/${ORDERS}`, {
              ...values,
              orderID: data.orderID,
              payerID: data.payerID,
              facilitatorAccessToken: data.facilitatorAccessToken,
              paymentSource: data.paymentSource,
              amount: Number(amount),
              productQuantity,
            });
            localStorage.removeItem("cartProductQuantityCustomer");
            localStorage.removeItem("cartProductsCustomer");
            notification.success({
              message: "Successfully",
              description: "Order creation successful!",
            });
            window.location.href = '/'
          });
        }}
      />
    </>
  );
};

export default function OrderInfo({ isValid, getData }) {
  const { productQuantity, products } = useSelector((state) => state.Cart);
  function renderProducts() {
    totalPrice = 0;
    return productQuantity.map((product) => {
      totalPrice += product.quantity * products[product.id].price;
      return (
        <SingleOrderInfo
          key={product.id}
          quantity={product.quantity}
          {...products[product.id]}
        />
      );
    });
  }

  return (
    <OrderTable className="isoOrderInfo">
      <div className="isoOrderTable">
        <div className="isoOrderTableHead">
          <span className="">Image</span>
          <span className="tableHead">Product</span>
          <span className="tableHead">Total</span>
        </div>

        <div className="isoOrderTableBody">{renderProducts()}</div>
        <div className="isoOrderTableFooter">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <PayPalScriptProvider
          options={{
            "client-id":
              "Aa8rghvnhNGuj0j6OOMFsYkG4UCtHJ4s2MkYaveY3J9xjpsTzRA0tfPpjH8YoXFlG5t08LIw17dfoLob",
            components: "buttons",
            currency: "USD",
          }}
        >
          <ButtonWrapper
            currency={currency}
            showSpinner={false}
            amount={totalPrice.toFixed(2)}
            isValid={isValid}
            getData={getData}
            productQuantity={productQuantity}
          />
        </PayPalScriptProvider>
      </div>
    </OrderTable>
  );
}
