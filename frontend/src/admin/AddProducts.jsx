import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    id: "",
    title: "",
    price: "",
    category: "",
    offer: "",
    desp: "",
    brand: "",
    inStockQty: "",
    sizes: [],
    colors: [],
  });
  const [colorsInput, setColorsInput] = useState("");
  const [imageFiles, setImageFiles] = useState([]); // Store multiple files
  const [imageURLs, setImageURLs] = useState([]); // Store multiple image URLs
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]); // Store all selected files
  };
  const uploadImages = async () => {
    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append("images", file);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/admin/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const urls = res.data.images.map((img) => img.url);
      setImageURLs(urls);
      setLoading(false);
      return urls;
    } catch (err) {
      setLoading(false);
      console.error("Image upload failed", err);
      setError("Image upload failed. Please try again.");
      return null;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (imageFiles.length === 0) return setError("Please upload at least one image.");
    if (!productData.title || !productData.price || !productData.category || !productData.offer || !productData.desp || !productData.brand) {
      return setError("Please fill all fields.");
    }

    const uploadedURLs = await uploadImages();
    if (!uploadedURLs || uploadedURLs.length === 0) return;

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/products/create", // this route should save product to DB
        { ...productData, images: uploadedURLs }, // Include all uploaded image URLs
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Product added successfully!");
      setProductData({
        id: "",
        title: "",
        price: "",
        category: "",
        offer: "",
        desp: "",
        brand: "",
        inStockQty: "",
        sizes:[], // Reset form
        colors: [],
      });
      setImageFiles([]);
      setImageURLs([]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Failed to add product", err);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="id"
          value={productData.id}
          onChange={handleChange}
          placeholder="Product ID"
          className="w-full border p-2"
        />
        <input
          name="title"
          value={productData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2"
        />
        <input
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full border p-2"
        />
        <input
          name="category"
          value={productData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2"
        />
        <input
          name="offer"
          value={productData.offer}
          onChange={handleChange}
          placeholder="Offer"
          className="w-full border p-2"
        />
        <input
          name="brand"
          value={productData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full border p-2"
        />
        <textarea
          name="desp"
          value={productData.desp}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
        />
        <input
          name="inStockQty"
          value={productData.inStockQty}
          onChange={handleChange}
          placeholder="In Stock Quantity"
          type="number"
          className="w-full border p-2"

        />
       
        <div className="flex gap-4">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size} className="flex items-center space-x-1">
              <input
                type="checkbox"
                value={size}
                checked={productData.sizes.includes(size)}
                onChange={(e) => {
                  const newSizes = e.target.checked
                    ? [...productData.sizes, size]
                    : productData.sizes.filter((s) => s !== size);
                  setProductData({ ...productData, sizes: newSizes });
                }}
              />
              <span>{size}</span>
            </label>
          ))}
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
    setProductData((prev) => ({ ...prev, colors: inputColors }));
  }}
  className="w-full border p-2 mt-2"
/>




        <input type="file" onChange={handleImageChange} multiple className="w-full border p-2" />
        {imageURLs.length > 0 && (
          <div className="flex gap-2 mt-2">
            {imageURLs.map((url, index) => (
              <img key={index} src={url} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover" />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
