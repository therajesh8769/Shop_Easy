export const getCart=() => JSON.parse(localStorage.getItem("cart")) || [];
export const addToCart=(item)=>{
    const cart=getCart();
    const existingIndex = cart.findIndex((i) => i.id === item.id);
    if (existingIndex !== -1) {
        cart[existingIndex].qty += 1;
      } else {
        cart.push({ ...item, qty: 1 });
      }
    localStorage.setItem("cart", JSON.stringify(cart));

};
export const clearCart=()=>{
    localStorage.removeItem("cart");
};