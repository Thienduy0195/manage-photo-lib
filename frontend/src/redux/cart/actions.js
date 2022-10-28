const actions = {
  INIT_DATA: 'CART_INIT_DATA',
  INIT_DATA_SAGA: 'CART_INIT_DATA_SAGA',
  UPDATE_DATA: 'CART_UPDATE_DATA',
  UPDATE_DATA_SAGA: 'CART_UPDATE_DATA_SAGA',
  CHANGE_VIEW: 'CART_CHANGE_VIEW',
  VIEW_TOPBAR_CART: 'CART_VIEW_TOPBAR_CART',
  initData: () => ({ type: actions.INIT_DATA_SAGA }),
  changeView: view => ({
    type: actions.CHANGE_VIEW,
    view,
  }),
  changeViewTopbarCart: viewTopbarCart => {
    return {
      type: actions.VIEW_TOPBAR_CART,
      viewTopbarCart,
    };
  },
  changeProductQuantity: productQuantity => {
    return (dispatch, getState) => {
      const { products } = getState().Cart;
      dispatch({
        type: actions.UPDATE_DATA_SAGA,
        products,
        productQuantity,
      });
    };
  },
  addToCart: product => {
    return (dispatch, getState) => {
      let { products, productQuantity } = getState().Cart;
      const id = product.id;
      const productItem = productQuantity.find(item => item.id === id)
      if (productItem) {
        productQuantity = productQuantity.map(item => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
      } else {
        productQuantity.push({ id, quantity: 1 });
      }
      if (!products[id]) {
        products[id] = product;
      }
      dispatch({
        type: actions.UPDATE_DATA_SAGA,
        products,
        productQuantity,
      });
    };
  },
};
export default actions;
