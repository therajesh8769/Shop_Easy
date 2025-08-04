import ProductCard from "../components/ProductCard";
// import { prod } from "../assets/products";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products=()=>{
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(""); // State for error messages
    

    const fetchProducts = async () => {
        try {
            const res = await axios.get("https://shop-easyb.vercel.app/api/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
                },
            });
            setProducts(res.data || []); // Ensure products is always an array
            console.log("Products fetched successfully", res.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
            setError("Failed to fetch products. Please try again later.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);










    return ( 
   <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
    {products.map((item, index) => (
        <ProductCard
            item={item}
            key={index}
            />
    ))}
    

</div>
)}
     


export default Products;