import React from 'react';

function Cart({ cartItems, removeFromCart }) {
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <div>The cart is empty</div>}
      {cartItems.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Qty: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
