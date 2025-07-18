import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch(); //Initialize dispatch variable to enable useDispatch() function.

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0; //total intiliazed as totalAmount for clarity
    
    cart.forEach((item) => { //iterating over the cart array using forEach
      const cost = parseFloat(item.cost.substring(1)); //cost string converted to number via parseFloat
      totalAmount += cost * item.quantity; //cost mulitiplied by item quantity
    });
    
    return totalAmount; //final total (totalAmount) sum returned
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e); //calls for onContinueShopping(e) to return to the plant listing page
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference'); //Placeholder for personal future work.
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); //Dispatch updateQuantity to increase item quantity by 1.
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) { //Conditional statement - executes first code block if item.quantity is 1 or more.
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); //Dispatch updateQuantity to decrease quantity by 1.
    } else { //Conditional statement - executes second code block if item.quantity is less than 1
      dispatch(removeItem(item.name)); //Dispatch removeItem to remove the item from the shopping cart.
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); //Removes item when removeItem is called.
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1)); //parseFloat used to convert string into floating point number.
    return cost * item.quantity;
  };
  

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


