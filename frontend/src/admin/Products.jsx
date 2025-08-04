import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate(); // React Router's navigate function

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/products", {
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return; // Exit if the user cancels the confirmation
        }

        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setProducts(products.filter((p) => p._id !== id));
        } catch (err) {
            console.error("Delete failed", err);
            setError("Failed to delete the product. Please try again.");
        }
    };

    const handleEdit = (id) => {
        console.log(id);
        navigate(`/admin/editproduct/${id}`); // Navigate to the edit page with the product ID
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error messages */}
            {products.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b text-gray-500">Images</th>
                                <th className="px-6 py-3 border-b text-gray-500">ID</th>
                                <th className="px-6 py-3 border-b text-gray-500">Price</th>
                                <th className="px-6 py-3 border-b text-gray-500">Category</th>
                                <th className="px-6 py-3 border-b text-gray-500">Offer</th>
                                <th className="px-6 py-3 border-b text-gray-500">Qty</th>
                                <th className="px-6 py-3 border-b text-gray-500">Sizes</th>
                                <th className="px-6 py-3 border-b text-gray-500">Colors</th>


                                <th className="px-6 py-3 border-b text-gray-500">Brand</th>
                                <th className="px-6 py-3 border-b text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                const validImages = product.images?.filter((img) => img) || [];
                                return (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="p-2 border-b">
                                            {validImages.length > 0 ? (
                                                <div className="flex gap-2">
                                                    {validImages.map((url, index) => (
                                                        <img
                                                            key={index}
                                                            src={url}
                                                            alt={`Product ${index + 1}`}
                                                            className="w-16 h-16 object-cover"
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 border-b">{product.id || "N/A"}</td>
                                        <td className="px-6 py-4 border-b">₹{product.price || "N/A"}</td>
                                        <td className="px-6 py-4 border-b">{product.category || "N/A"}</td>
                                        <td className="px-6 py-4 border-b">{product.offer || "N/A"}</td>

                                        <td className="px-6 py-4 border-b">{product.inStockQty || "N/A"}</td>
                                        <td className="px-6 py-4 border-b">
                                            {product.sizes && product.sizes.length > 0
                                                ? product.sizes.join(", ")
                                                : "N/A"
                                            }
                                       
                                         </td>
                                         <td className="px-6 py-4 border-b">
                                            {product.colors && product.colors.length > 0
                                                ? product.colors.join(", ")
                                                : "N/A"
                                            }
                                       
                                         </td>
                                        <td className="px-6 py-4 border-b">{product.brand || "N/A"}</td>
                                        <td className="px-6 py-4 border-b">
                                            <button
                                                className="text-blue-500 hover:underline mr-2"
                                                onClick={() => handleEdit(product.id)}
                                                
                                            >

                                                Edit
                                            </button>
                                            
                                            <button
                                                className="text-red-500 hover:underline"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No products found.</p>
            )}
        </div>
    );
};

export default Products;