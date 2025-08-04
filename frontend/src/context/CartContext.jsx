import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const getInitialCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existing = cart.find(
      (i) =>
        i.id === item.id &&
        i.selectedSize === item.selectedSize &&
        i.selectedColor === item.selectedColor
    );
  
    if (existing) {
      setCart((prev) =>
        prev.map((i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      );
    } else {
      setCart((prev) => [...prev, { ...item, qty: 1 }]);
    }
  };
  

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0) // auto-remove if qty is 0
    );
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };
  const getCartForCheckout = () => {
    return cart.map((item) => ({
      productId: item._id,
      title: item.title,
      
      size: item.selectedSize,
      color: item.selectedColor,
      price: item.price,
      quantity: item.qty,
      image: item.image,
    }));
  };
  console.log("Cart items for checkout:", getCartForCheckout());
  

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart,updateQty,getTotalAmount,
      getCartForCheckout, }}>
      {children}
    </CartContext.Provider>
  );
};
