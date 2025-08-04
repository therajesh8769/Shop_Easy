import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressForm from "./AddressForm"; // Assume this is your address form component

const SelectAddress = ({ onSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingId, setEditingId] = useState(null); // To track editing state

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("https://shopeasy-red.vercel.app/api/user/addresses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const all = res.data || [];
      setAddresses(all);

      const defaultIdx = all.findIndex((a) => a.isDefault);
      if (defaultIdx !== -1) {
        setSelectedIndex(defaultIdx);
        onSelect(all[defaultIdx]);
      }
    } catch (err) {
      console.error("Failed to load addresses", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onSelect(addresses[index]);
  };

  const handleSetDefault = async (id) => {
    try {
      await axios.patch(
        `https://shopeasy-red.vercel.app/api/user/addresses/${id}/default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchAddresses();
    } catch (err) {
      console.error("Failed to set default", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await axios.delete(`https://shopeasy-red.vercel.app/api/user/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await fetchAddresses();
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id); // Set the current editing ID
  };

  const handleEditSuccess = () => {
    setEditingId(null);
    fetchAddresses();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Select Delivery Address</h2>
      {addresses.length === 0 && <p>No saved addresses found.</p>}
      {addresses.map((addr, idx) => (
        <div
          key={addr._id}
          className={`border p-4 rounded cursor-pointer relative ${
            idx === selectedIndex ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() => handleSelect(idx)}
        >
          {editingId === addr._id ? (
            <AddressForm
              address={addr}
              onCancel={() => setEditingId(null)}
              onSuccess={handleEditSuccess}
            />
          ) : (
            <>
              <p className="font-semibold">
                {addr.name} ({addr.phone})
              </p>
              <p>
                {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p>{addr.address}</p>

              <div className="mt-2 flex justify-between items-center text-sm">
                <div className="flex gap-4">
                  {!addr.isDefault ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefault(addr._id);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      ✓ Default
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(addr._id);
                    }}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(addr._id);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SelectAddress;
