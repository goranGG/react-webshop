import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  console.log("function addCartItem called");
  const indexOfCartItem = cartItems.findIndex(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if product exists update its quantity
  if (indexOfCartItem !== -1) {
    cartItems[indexOfCartItem].quantity++;
    return [...cartItems];
  }

  // add new item to array with quantity 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (currentTotal, cartItem) => currentTotal + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  return (
    <CartContext.Provider
      value={{ isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
