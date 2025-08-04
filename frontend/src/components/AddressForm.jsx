import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressForm = ({ address: initialAddress = {}, onSuccess, onCancel }) => {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    city: "",
    state: "",
    address: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialAddress && initialAddress._id) {
      setAddress(initialAddress);
    }
  }, [initialAddress]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      if (initialAddress && initialAddress._id) {
        // Update existing
        await axios.put(
          `https://shopeasy-red.vercel.app/api/user/addresses/${initialAddress._id}`,
          address,
          config
        );
      } else {
        // Create new
        await axios.post(
          "https://shopeasy-red.vercel.app/api/user/address",
          address,
          config
        );
      }

      onSuccess(); // Refresh list
    } catch (err) {
      setError("Failed to save address.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white shadow rounded">
      {error && <p className="text-red-500">{error}</p>}
      <input name="name" value={address.name} onChange={handleChange} placeholder="Full Name" required className="w-full p-2 border" />
      <input name="phone" value={address.phone} onChange={handleChange} placeholder="Phone" required className="w-full p-2 border" />
      <input name="pincode" value={address.pincode} onChange={handleChange} placeholder="Pincode" required className="w-full p-2 border" />
      <input name="locality" value={address.locality} onChange={handleChange} placeholder="Locality" required className="w-full p-2 border" />
      <input name="city" value={address.city} onChange={handleChange} placeholder="City" required className="w-full p-2 border" />
      <input name="state" value={address.state} onChange={handleChange} placeholder="State" required className="w-full p-2 border" />
      <textarea name="address" value={address.address} onChange={handleChange} placeholder="Full Address" required className="w-full p-2 border" />

      <div className="flex justify-between">
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          {initialAddress && initialAddress._id ? "Update" : "Save"} Address
        </button>
        {onCancel && (
          <button
            type="button"
            className="text-gray-600 underline ml-4"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddressForm;
