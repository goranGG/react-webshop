import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  total: 0,
});

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, productToRemove) => {
  const indexOfCartItem = cartItems.findIndex(
    (cartItem) => cartItem.id === productToRemove.id
  );
  cartItems[indexOfCartItem].quantity--;

  if (cartItems[indexOfCartItem].quantity === 0) {
    cartItems.splice(indexOfCartItem, 1);
  }
  return [...cartItems];
};

const clearCartItem = (cartItems, productToRemove) => {
  const indexOfCartItem = cartItems.findIndex(
    (cartItem) => cartItem.id === productToRemove.id
  );
  cartItems.splice(indexOfCartItem, 1);

  return [...cartItems];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (currentTotal, cartItem) => currentTotal + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (currentTotal, cartItem) =>
        currentTotal + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
