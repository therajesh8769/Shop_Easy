import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from the route
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [newImages, setNewImages] = useState([]); // State for new images
    const [imageURLs, setImageURLs] = useState([]);
    const [colorsInput, setColorsInput] = useState("");
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`hhttps://shop-easyb.vercel.app/api/products/${id}`);
                setProduct(res.data);
                setColorsInput(res.data.colors?.join(", ") || ""); 
            } catch (err) {
                console.error("Failed to fetch product", err);
                setError("Failed to fetch product details.");
            }
        };
        fetchProduct();
    }, [id]);


    const uploadImages = async (files) => {
        const uploadedURLs = [];

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append("images", file);

                const res = await axios.post(
                    "https://shop-easyb.vercel.app/api/admin/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );


                const urls = res.data.images.map((img) => img.url);
                uploadedURLs.push(...urls); // Flattened push
            }

            return uploadedURLs;
        } catch (err) {
            console.error("Image upload failed", err);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            let uploadedURLs = product.images; // existing images

            if (newImages.length > 0) {
                const newURLs = await uploadImages(newImages);
                if (!newURLs) throw new Error("Image upload failed");
                uploadedURLs = newURLs;
            }

            const updatedData = {
                title: product.title,
                price: product.price,
                brand: product.brand,
                category: product.category,
                desp: product.desp,
                inStockQty: product.inStockQty,
                images: uploadedURLs,
                sizes: product.sizes || [], // Keep existing sizes or empty array
                offer: product.offer || "", // Keep existing offer or empty string
                colors: product.colors || [],
            };

            await axios.put(
                `https://shop-easyb.vercel.app/api/products/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Product updated successfully!");
            navigate("/admin/products");
        } catch (err) {
            console.error("Failed to update product", err);
            setError("Failed to update product. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setNewImages([...e.target.files]); // Store new images in state
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={product.title || ""}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-2"
                />
                <input
                    name="price"
                    value={product.price || ""}
                    onChange={handleChange}
                    placeholder="Price"
                    type="number"
                    className="w-full border p-2"
                />
                <input
                    name="brand"
                    value={product.brand || ""}
                    onChange={handleChange}
                    placeholder="Brand"
                    className="w-full border p-2"
                />
                <input
                    name="category"
                    value={product.category || ""}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full border p-2"
                />
                <input
                    name="offer"
                    value={product.offer || ""}
                    onChange={handleChange}
                    placeholder="Offer (e.g. Buy 1 Get 1)"
                    className="w-full border p-2"
                />

                <textarea
                    name="desp"
                    value={product.desp || ""}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-2"
                />

                <input
                    name="inStockQty"
                    value={product.inStockQty || 0}
                    onChange={handleChange}

                    placeholder="In Stock Quantity"
                    type="number"
                    className="w-full border p-2"
                />

                <div>
                    <label className="block font-semibold mb-1">Sizes</label>
                    <div className="flex gap-4 flex-wrap">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                            <label key={size} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    value={size}
                                    checked={product.sizes?.includes(size)}
                                    onChange={(e) => {
                                        const newSizes = e.target.checked
                                            ? [...(product.sizes || []), size]
                                            : product.sizes.filter((s) => s !== size);
                                        setProduct({ ...product, sizes: newSizes });
                                    }}
                                />
                                <span>{size}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <input
  type="text"
  name="colors"
  placeholder="Enter colors (comma separated)"
  value={colorsInput}
  onChange={(e) => {
    const value = e.target.value;
    setColorsInput(value); // let user type freely

    const inputColors = value
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c !== "");
    setProduct((prev) => ({ ...prev, colors: inputColors }));
  }}
  className="w-full border p-2 mt-2"
/>



                {/* Display existing images */}
                <div className="flex gap-2">
                    {product.images?.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-16 h-16 object-cover"
                        />
                    ))}
                </div>

                {/* File input for new images */}
                <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="w-full border p-2"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;