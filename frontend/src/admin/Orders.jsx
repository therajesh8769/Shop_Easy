import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("https://shop-easyb.vercel.app/api/orders/getAllOrders", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            });
            console.log(res.data);
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        }
    };
    const handleStatusChange = async (orderId, newStatus) => {
        try {
          await axios.put(
            `https://shop-easyb.vercel.app/api/delivery/${orderId}/update-status`, // Changed from /api/admin/
            { status: newStatus },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(newStatus);
          fetchOrders(); // Refresh order list after update
        } catch (err) {
          console.error("Status update failed", err);
        }
      };
      

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Order ID</th>
                            <th className="p-2 border">Payment ID</th>

                            <th className="p-2 border">User</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Product info</th>

                            <th className="p-2 border">Address</th>
                            <th className="p-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="p-2 border">{order._id}</td>
                                <td className="p-2 border">
                                    {order.paymentId ? order.paymentId : "Not Paid"}
                                </td>
                                <td className="p-2 border">{order.user?.email}</td>
                                <td className="p-2 border">₹{order.totalAmount}</td>
                                <td className="p-2 border">
                                    {order.cartItems.map((item, i) => (
                                        <div key={i}>
                                            {item.title}<br />
                                            Size: {item.size} <br />
                                            Color: {item.color} <br />
                                            Qty: {item.quantity}
                                            <br />
                                        </div>
                                    ))}
                                </td>



                                <td className="p-2 border">
                                    {order.address.name}<br />
                                    {order.address.phone}<br />
                                    {order.address.address}<br />
                                    {order.address.locality}, {order.address.city}<br />
                                    {order.address.state} - {order.address.pincode}
                                </td>

                                <td className="p-2 border">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="border p-1 rounded"
                                    >
                                        {["Order-Placed", "Packed", "Shipped", "out for delivery", "Delivered"].map((statusOption) => (
                                            <option key={statusOption} value={statusOption}>
                                                {statusOption}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
