import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotal, placeOrder } = useCart();
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const success = await placeOrder(shippingAddress);
    if (success) {
      navigate('/dashboard');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <h2>Your Cart is Empty</h2>
        <p>Add some items to your cart to get started!</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.product._id} className="cart-item">
            <img src={item.product.image} alt={item.product.name} />
            <div className="item-details">
              <h3>{item.product.name}</h3>
              <p>{item.product.description}</p>
              <p>Price: ${item.product.price}</p>
              <div className="quantity-controls">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                />
                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  className="btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${getTotal()}</h3>
        <button
          className="btn-primary"
          onClick={() => setShowCheckout(true)}
        >
          Proceed to Checkout
        </button>
      </div>

      {showCheckout && (
        <div className="checkout-form">
          <h3>Shipping Information</h3>
          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={shippingAddress.name}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Confirm Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart; 
 