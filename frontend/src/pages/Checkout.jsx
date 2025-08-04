import React, { useState, useContext } from "react";
import SelectAddress from "../components/SelectAddress";
import AddressForm from "../components/AddressForm";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const {getCartForCheckout, getTotalAmount, clearCart } = useContext(CartContext);

  const cartItems = getCartForCheckout();
  console.log("Cart items for checkout:", cartItems);
  const totalPrice = getTotalAmount();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddressAddSuccess = () => {
    setShowForm(false);
    window.location.reload(); 
  };

//   const handlePlaceOrder = async () => {
//     if (!selectedAddress) return alert("Please select a delivery address.");

//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/orders",
//         {
//           cartItems,
//           totalAmount: totalPrice,
//           address: selectedAddress,
         
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert("Order placed!");
//       clearCart(); // Clear the cart
//       navigate("/thankyou"); // Redirect to Thank You page
//     } catch (err) {
//       console.error("Order failed", err);
//       alert("Something went wrong while placing the order.");
//     }
//   };
const handlePlaceOrder = async () => {
    
    try {
     

      const totalAmount= getTotalAmount();
      if (!selectedAddress) return alert("Please select a delivery address.");
      if (totalAmount <= 0) return alert("Cart is empty. Please add items to cart before checkout.");
      const res = await axios.post(
        "https://shop-easyb.vercel.app/api/payment/create-order",
       { 
        amount: totalAmount
        },
            {
       headers: {
                   Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }

    );
      const { id: order_id, amount, currency } = res.data;
  
    
      const options = {
        key: "rzp_test_x2zDO1DBNYyeYb",
        amount,
        currency,
        order_id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
  
          // Step 3: Send to backend for verification
          const verifyRes = await axios.post("https://shop-easyb.vercel.app/api/payment/verify-payment", {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            cartItems: getCartForCheckout(),
            address: selectedAddress,
            totalAmount,
          },
          {
            headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                     },
                 }
        );
        if( verifyRes.status !== 200) {
            alert("Payment verification failed");
            return;
          }
 
          if (verifyRes.data.success) {
           
            navigate(`/thankyou/${order_id}`); // Redirect to Thank You page
          clearCart(); // Clear the cart
        } else {
            alert("Payment verification failed");
          }
        },
        theme: {
          color: "#000",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <SelectAddress onSelect={handleAddressSelect} />
      <button className="text-blue-600 underline mt-2" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Address"}
      </button>

      {showForm && <AddressForm onSuccess={handleAddressAddSuccess} />}

      <h2 className="text-xl font-bold mt-6 mb-2">Order Summary</h2>
      <ul className="divide-y">
        {cartItems.map((item, idx) => (
          <li key={idx} className="py-2 flex justify-between">
            <span>{item.title} x {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>₹{totalPrice}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-black text-white py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
