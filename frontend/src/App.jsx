import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import ProductDetail from './pages/productDetails';
import Navbar from './components/navbar/Navbar';
import HeroSection from './components/HeroSection';
import Products from './pages/Products';
import Cartpage from './pages/CartPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ProductsAdmin from "./admin/Products";
import AddProduct from "./admin/AddProducts";
import Orders from "./admin/Orders";
import Users from "./admin/Users";
import EditProduct from "./admin/EditProduct";
import Checkout from './pages/Checkout';
import ThankYouPage from './pages/ThankYouPage';
import './App.css';
import thankyou from './pages/ThankYouPage';
import OrderTracking from './pages/OrderTracking';


function MainLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {location.pathname === '/' && <HeroSection />}
      <Outlet /> {/* This is where nested routes will render */}
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* User routes with Navbar + Hero */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou/:orderId" element={<ThankYouPage />} />
        <Route path="/ordertracking" element={<OrderTracking />} />

      </Route>

      {/* Admin routes (no Navbar or Hero here, just AdminLayout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="/admin/editproduct/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
