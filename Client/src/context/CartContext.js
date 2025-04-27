import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Get cart total
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // Place order
  const placeOrder = async (shippingAddress) => {
    try {
      setLoading(true);
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        shippingAddress
      };

      await axios.post('/api/orders', orderData, {
        headers: {
          'x-auth-token': token
        }
      });

      clearCart();
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response.data.msg);
      setLoading(false);
      return false;
    }
  };

  // Get order history
  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/orders', {
        headers: {
          'x-auth-token': token
        }
      });
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        placeOrder,
        getOrders
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 
 