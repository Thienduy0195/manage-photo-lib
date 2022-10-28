import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from '@iso/components/utility/intlMessages';
import Scrollbar from '@iso/components/utility/customScrollBar';
import Popover from '@iso/components/uielements/popover';
import SingleCart from '@iso/components/Cart/SingleCartModalCustomer';
import cartAction from '@iso/redux/cart/actions';
import TopbarDropdownWrapper from './TopbarDropdown.styles';

const {
  initData,
  changeViewTopbarCart,
  changeProductQuantity,
} = cartAction;
let totalPrice;
export default function TopbarAddtoCart() {
  let { url } = useRouteMatch();
  const dispatch = useDispatch();
  const {
    productQuantity,
    products,
    loadingInitData,
    viewTopbarCart,
  } = useSelector(state => state.Cart);

  function hide() {
    dispatch(changeViewTopbarCart(false));
  }
  function handleVisibleChange() {
    dispatch(changeViewTopbarCart(!viewTopbarCart));
  }
  React.useEffect(() => {
    if (!loadingInitData) {
      dispatch(initData());
    }
  }, [dispatch, loadingInitData]);

  function renderProducts() {
    totalPrice = 0;
    if (!productQuantity || productQuantity.length === 0) {
      return (
        <div className="isoNoItemMsg">
          <span>No item found</span>
        </div>
      );
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

  const content = (
    <TopbarDropdownWrapper className="topbarAddtoCart">
      <div className="isoDropdownHeader">
        <h3>
          <IntlMessages id="sidebar.cart" />
        </h3>
      </div>
      <div className="isoDropdownBody isoCartItemsWrapper">
        <Scrollbar style={{ height: 300 }}>{renderProducts()}</Scrollbar>
      </div>
      <div className="isoDropdownFooterLinks">
        <Link to={`/cart`} onClick={hide}>
          <IntlMessages id="topbar.viewCart" />
        </Link>

        <h3>
          <IntlMessages id="topbar.totalPrice" />:{' '}
          <span>${totalPrice.toFixed(2)}</span>
        </h3>
      </div>
    </TopbarDropdownWrapper>
  );
  return (
    <Popover
      content={content}
      trigger="click"
      visible={viewTopbarCart}
      onVisibleChange={handleVisibleChange}
      placement="bottomLeft"
    >
      <div className="isoIconWrapper">
        <i
          className="ion-android-cart"
          style={{ color: '#323332' }}
        />
        {productQuantity.length === 0 ? (
          ''
        ) : (
          <span>{productQuantity.length}</span>
        )}
      </div>
    </Popover>
  );
}
