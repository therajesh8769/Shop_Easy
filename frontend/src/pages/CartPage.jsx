import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

const CartPage = () => {
   // const [cart, setCart] = useState([]);
const {cart,addToCart, removeFromCart, clearCart,updateQty } = useContext(CartContext);


const navigate = useNavigate();


const handleCheckout = () => {
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return alert("Please login to proceed to checkout");
  }

  if (cart.length === 0) {
    return alert("Your cart is empty");
  }

  navigate("/checkout");
};


    
    const handleQtyChange = (item, delta) => {
        updateQty (item.id, delta);
      };
    
      const total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);


    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-4xl font-bold mb-8">Your Bag</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Cart Items */}
                <div className="md:col-span-2 space-y-8">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row gap-4 border-b pb-4"
                            >
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="w-full sm:w-32 h-40 object-cover rounded-md"
                                />
                                <div className="flex-1 space-y-1">
                                    <h2 className="text-lg md:text-xl font-semibold">{item.title}</h2>
                                    <p className="text-sm text-gray-600">Brand: {item.brand || "Your Brand"}</p>

                                    <p className="text-sm text-gray-600">
  Color: <span className="capitalize">{item.selectedColor}</span>{" "}
  <span
    className="inline-block w-4 h-4 rounded-full border ml-1"
    style={{ backgroundColor: item.selectedColor }}
  ></span>
</p>
<p className="text-sm text-gray-600">Size: {item.selectedSize}</p>


                                    <div className="flex items-center mt-2 space-x-2">
                                        <button className="border px-3 py-1 text-sm" onClick={() => handleQtyChange(item, -1)}>-</button>
                                        <span className="px-2 text-sm">{item.qty}</span>
                                        <button className="border px-3 py-1 text-sm" onClick={() => handleQtyChange(item, 1)}>+</button>
                                    </div>

                                    <p className="mt-2 font-semibold text-sm md:text-base">Rs. {item.price}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">Your cart is empty.</p>
                    )}
                </div>

                {/* Right: Summary */}
                {cart.length > 0 && (
                    <div className="space-y-4  p-4 md:p-6 shadow-sm">
                        <div className="flex justify-between text-sm">
                            <span>Order value</span>
                            <span>Rs. {total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Estimated delivery fee</span>
                            <span className="text-green-600">FREE</span>
                        </div>

                        <hr />

                        <div className="flex justify-between font-bold text-base md:text-lg">
                            <span>TOTAL</span>
                            <span>Rs. {total}</span>
                        </div>
                        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>

                        <button
                            onClick={()=> clearCart()}
                            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                        >
                            Clear Cart
                        </button>
                       
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;