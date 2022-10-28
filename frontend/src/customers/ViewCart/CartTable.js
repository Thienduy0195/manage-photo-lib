import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import SingleCart from '@iso/components/Cart/SingleCartCustomer';
import ecommerceActions from '@iso/redux/cart/actions';
import ProductsTable from './CartTable.styles';
import { direction } from '@iso/lib/helpers/rtl';

const { changeProductQuantity } = ecommerceActions;

let totalPrice = 0;
export default function CartTable({ style }) {
  const dispatch = useDispatch();
  const { productQuantity, products } = useSelector(state => state.Cart);

  function renderItems() {
    totalPrice = 0;
    if (!productQuantity || productQuantity.length === 0) {
      return <tr className="isoNoItemMsg">No item found</tr>;
    }
    return productQuantity.map(product => {
      totalPrice += product.quantity * products[product.id].price;
      return (
        <SingleCart
          key={product.id}
          quantity={product.quantity}
          changeQuantity={changeQuantity}
          cancelQuantity={cancelQuantity}
          {...products[product.id]}
        />
      );
    });
  }
  function changeQuantity(id, quantity) {
    const newProductQuantity = [];
    productQuantity.forEach(product => {
      if (product.id !== id) {
        newProductQuantity.push(product);
      } else {
        newProductQuantity.push({
          id,
          quantity,
        });
      }
    });
    dispatch(changeProductQuantity(newProductQuantity));
  }
  function cancelQuantity(id) {
    const newProductQuantity = [];
    productQuantity.forEach(product => {
      if (product.id !== id) {
        newProductQuantity.push(product);
      }
    });
    dispatch(changeProductQuantity(newProductQuantity));
  }
  const classname = style != null ? style : '';
  return (
    <ProductsTable className={`isoCartTable ${classname}`}>
      <table>
        <thead>
          <tr>
            <th className="isoItemRemove" />
            <th className="isoItemImage" />
            <th className="isoItemName">Product</th>
            <th className="isoItemPrice">Price</th>
            <th className="isoItemQuantity">Quantity</th>
            <th className="isoItemPriceTotal">Total</th>
          </tr>
        </thead>

        <tbody>
          {renderItems()}
          <tr className="isoTotalBill">
            <td className="isoItemRemove" />
            <td className="isoItemImage" />
            <td className="isoItemName" />
            <td className="isoItemPrice" />
            <td className="isoItemQuantity">Total</td>
            <td className="isoItemPriceTotal">${totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td
              style={{
                width: '100%',
                paddingRight: `${direction === 'rtl' ? '0' : '25px'}`,
                paddingLeft: `${direction === 'rtl' ? '25px' : '0'}`,
              }}
            >
            </td>
            <td
              style={{
                paddingRight: `${direction === 'rtl' ? '0' : '25px'}`,
                paddingLeft: `${direction === 'rtl' ? '25px' : '0'}`,
              }}
            >
            </td>
            <td>
              <Button type="primary">
                <Link to={'/checkout'}>Checkout</Link>
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </ProductsTable>
  );
}
