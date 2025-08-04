import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, Search, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/orders/user-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    const statusMap = {
      'Order-Placed': 0,
      'Packed': 1,
      'Shipped': 2,
      'out for delivery': 3,
      'Delivered': 4
    };
    return statusMap[status] || 0;
  };

  const statusSteps = [
    { label: 'Order placed', icon: Package },
    { label: 'Order packed', icon: Package },
    { label: 'Order shipped', icon: Truck },
    { label: 'Out for delivery', icon: Truck },
    { label: 'Delivered', icon: CheckCircle }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProgressTracker = ({ currentStep, orderDate }) => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isActive = index === currentStep;
            const StepIcon = step.icon;
            
            return (
              <div key={index} className="flex flex flex-col items-center relative">
                <div className={`w-full h-8 rounded-full flex items-center justify-center border-2 mb-2 ${
                  isCompleted 
                    ? 'bg-black border-black text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <StepIcon className="w-4 h-4" />
                </div>
                <span className={`text-xs text-center ${
                  isCompleted ? 'text-black font-medium' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
                {index < statusSteps.length - 1 && (
                  <div className={`absolute top-4 left-1/2 w-full h-0.5 ${
                    isCompleted ? 'bg-black' : 'bg-gray-200'
                  }`} style={{ transform: 'translateX(50%)', zIndex: -1 }} />
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Order placed on {formatDate(orderDate)}
          </p>
        </div>
      </div>
    );
  };

  const OrderCard = ({ order }) => {
    const currentStep = getStatusStep(order.status);
    
    return (
      <div className="  p-10 hover:shadow-lg transition-shadow cursor-pointer"
           onClick={() => setSelectedOrder(order)}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-black text-lg">Order #{order._id.slice(-8)}</h3>
            <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-black">₹{order.totalAmount}</p>
            <p className="text-sm text-gray-600 capitalize">{order.status}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            {statusSteps.slice(0, currentStep + 1).map((_, index) => (
              <div key={index} className="w-3 h-3 bg-black rounded-full"></div>
            ))}
            {statusSteps.slice(currentStep + 1).map((_, index) => (
              <div key={index} className="w-3 h-3 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <p className="text-sm text-gray-600">{order.cartItems.length} items</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{order.address?.city}</span>
          </div>
          <span className="text-sm text-black font-medium">View details →</span>
        </div>
      </div>
    );
  };

  const OrderDetail = ({ order }) => {
    const currentStep = getStatusStep(order.status);
    
    return (
      <div className="bg-white">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <button 
            onClick={() => setSelectedOrder(null)}
            className="flex items-center text-black hover:text-gray-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to orders
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-medium text-black mb-2">Order #{order._id.slice(-8)}</h2>
              <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-medium text-black">₹{order.totalAmount}</p>
              <p className="text-gray-600 capitalize">{order.status}</p>
            </div>
          </div>
        </div>
        
        <ProgressTracker currentStep={currentStep} orderDate={order.createdAt} />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Order items</h3>
            <div className="space-y-4">
              {order.cartItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-black">{item.title}</h4>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Delivery details</h3>
            <div className="space-y-6">
              <div className="p-4 border border-gray-200">
                <h4 className="font-medium text-black mb-2">Delivery address</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-black">{order.address?.name}</p>
                  <p>{order.address?.address}</p>
                  <p>{order.address?.locality}, {order.address?.city}</p>
                  <p>{order.address?.state} - {order.address?.pincode}</p>
                  <p className="flex items-center mt-2">
                    <Phone className="w-4 h-4 mr-2" />
                    {order.address?.phone}
                  </p>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200">
                <h4 className="font-medium text-black mb-2">Payment details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Payment ID: {order.paymentId || 'Pending'}</p>
                  <p>Total amount: ₹{order.totalAmount}</p>
                  <p>Payment status: {order.paymentId ? 'Paid' : 'Pending'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchOrders}
            className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {selectedOrder ? (
          <OrderDetail order={selectedOrder} />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-light text-black mb-2">My orders</h1>
              <p className="text-gray-600">Track and manage your orders</p>
            </div>
            
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
                />
              </div>
            </div>
            
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-black mb-2">No orders found</h3>
                <p className="text-gray-600">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map(order => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;