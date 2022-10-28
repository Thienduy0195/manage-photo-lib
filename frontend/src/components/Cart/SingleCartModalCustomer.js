import React from 'react';
import TopbarCartWrapper from './SingleCartModal.style';

export default function({
  price,
  quantity,
  image,
  id,
  cancelQuantity,
  name,
  title
}) {
  return (
    <TopbarCartWrapper className="isoCartItems">
      <div className="isoItemImage">
        <img alt="#" src={image} />
      </div>
      <div className="isoCartDetails">
        <h3>
          <a href="#!">{name || title}</a>
        </h3>
        <p className="isoItemPriceQuantity">
          <span>$</span>
          <span>{price.toFixed(2)}</span>
          <span className="itemMultiplier">X</span>
          <span className="isoItemQuantity">{quantity}</span>
        </p>
      </div>
      <a
        className="isoItemRemove"
        onClick={() => cancelQuantity(id)}
        href="#!"
      >
        <i className="ion-android-close" />
      </a>
    </TopbarCartWrapper>
  );
}
