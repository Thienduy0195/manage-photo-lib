import React from 'react';
import InputNumber from '../uielements/InputNumber';
import { notification } from '../index';

export default function({
  price,
  quantity,
  image,
  id,
  cancelQuantity,
  changeQuantity,
  name,
  title,
  description
}) {
  const onChange = value => {
    if (!isNaN(value)) {
      if (value !== quantity) {
        changeQuantity(id, value);
      }
    } else {
      notification('error', 'Please give valid number');
    }
  };

  const totalPrice = (price * quantity).toFixed(2);
  return (
    <tr>
      <td
        className="isoItemRemove"
        onClick={() => {
          cancelQuantity(id);
        }}
      >
        <a href="# ">
          <i className="ion-android-close" />
        </a>
      </td>
      <td className="isoItemImage">
        <img alt="#" src={image} />
      </td>
      <td className="isoItemName">
        <h3>{name || title}</h3>
        <p>{description || 'Repro - 40x60cm'}</p>
      </td>
      <td className="isoItemPrice">
        <span className="itemPricePrefix">$</span>
        {price.toFixed(2)}
      </td>
      <td className="isoItemQuantity">
        <InputNumber
          min={1}
          max={1000}
          value={quantity}
          step={1}
          onChange={onChange}
        />
      </td>
      <td className="isoItemPriceTotal">${totalPrice}</td>
    </tr>
  );
}
