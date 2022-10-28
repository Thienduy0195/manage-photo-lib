const productDatas = [];
function getInitData() {
  let productQuantity = [];
  const products = {};
  const cartProductQuantity = localStorage.getItem('cartProductQuantity');
  let cartProducts = localStorage.getItem('cartProducts');
  if (cartProducts && cartProductQuantity) {
    cartProducts = JSON.parse(cartProducts);
    JSON.parse(cartProductQuantity).forEach(product => {
      const id = product.id;
      if (!isNaN(product.quantity)) {
        productQuantity.push({
          id,
          quantity: parseInt(product.quantity, 10),
        });
        products[id] = {
          ...cartProducts[id],
          price: parseFloat(cartProducts[id].price, 10),
        };
      }
    });
  } else {
    productDatas.forEach(product => {
      productQuantity.push({
        id: product.id,
        quantity: 1,
      });
      products[product.id] = product;
    });
  }
  return { productQuantity, products };
}

export default getInitData();
