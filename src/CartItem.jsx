import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../CartSlice";

const CartItems = ({ cartItems, onContinueShopping }) => {
  const dispatch = useDispatch();

  // Calculate subtotal for each item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // remove "$"
    return (price * item.quantity).toFixed(2);
  };

  // Calculate total for all items
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.cost.substring(1));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Checkout placeholder
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item entirely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} className="cart-image" />

            <div className="cart-details">
              <h2>{item.name}</h2>
              <p>Price: {item.cost}</p>

              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>

              <p>Subtotal: ${calculateTotalCost(item)}</p>

              <button
                className="remove-button"
                onClick={() => handleRemove(item)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h2>Total: ${calculateTotalAmount()}</h2>

          <button className="continue-button" onClick={handleContinueShopping}>
            Continue Shopping
          </button>

          <button className="checkout-button" onClick={handleCheckoutShopping}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartItems;



