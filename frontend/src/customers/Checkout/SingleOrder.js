import React from 'react';

export default function ({ price, quantity, name, title, image = '' }) {
  const nameProduct = name || title;
  const totalPrice = (price * quantity).toFixed(2);
  const trimName = nameProduct ? nameProduct.substring(0, 30) : '';
  return (
    <div className="isoSingleOrderInfo">
      <img src={image} width="100" height="100" />
      <p>
        <span>{trimName}</span>
        <span>x</span>
        <span className="isoQuantity">{quantity}</span>
      </p>
      <span className="totalPrice">${totalPrice}</span>
    </div>
  );
}
