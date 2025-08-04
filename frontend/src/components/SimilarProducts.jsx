import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const SimilarProducts=({item})=>{
    // This component will fetch and display similar products based on category and id
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get("https://shop-easyb.vercel.app/api/products");
          setAllProducts(res.data);
        } catch (err) {
          console.error("Failed to fetch products", err);
          setError("Failed to load similar products.");
        }
      };
  
      fetchProducts();
    }, []);
    const similar = allProducts.filter(
      (product) =>
        product.category === item.category && String(product._id) !== String(item._id)
    );
  
    if (error) return <div>{error}</div>;
  
    if (similar.length === 0) {
      return <div>No similar products found.</div>;
    }
    return ( 
        <div className="mt-12 px-4">
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {similar.map((product) => (
                    <ProductCard item={product} key={product.id} />
                ))}
            </div>  
        </div>
     );
    
};


export default SimilarProducts;