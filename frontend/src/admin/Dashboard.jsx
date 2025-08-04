import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
       
  
        const token = localStorage.getItem("token");
       
  
        const res = await axios.get("http://localhost:8080/api/users/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        
  
        setUserCount(res.data || 0);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
  
    fetchStats();
  }, []);

  const fetchProductCount = async () => {
        try{
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8080/api/products/stats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProductCount(res.data || 0);
        }
        catch(err) {
            console.error("Failed to fetch product count", err);
        }
    }
  useEffect(() => { 
    fetchProductCount();
  }
  , []);
  const fetchOrdersCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/orders/getOrderStats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrdersCount(res.data || 0);
    }
    catch (err) {
      console.error("Failed to fetch orders count", err);
    }
  }
  useEffect(() => {
    fetchOrdersCount();
  }, []);
  
  
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={productCount} />
        <StatCard title="Total Users" value={userCount} />
        <StatCard title="Orders" value={ordersCount} />
        <StatCard title="Revenue" value="₹1,40,000" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow p-4 rounded text-center border">
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
