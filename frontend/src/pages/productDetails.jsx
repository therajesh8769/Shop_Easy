import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useSwipeable } from 'react-swipeable';
import Accordian from '../components/Accordian';
import SimilarProducts from '../components/SimilarProducts';
import { CartContext } from '../context/CartContext.jsx';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDetail = () => {
    const {addToCart} = useContext(CartContext);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    


    const openModel = (image) => {
        setSelectedIndex(image);
        setIsModelOpen(true);
    };

    const closeModel = () => {
        setSelectedIndex(null);
        setIsModelOpen(false);
    };

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const swipeHandlers = useSwipeable({
        onSwipedDown: () => closeModel(),
        onSwipedLeft: () => {
            const currentIndex = product.images.indexOf(selectedImage);
            const nextIndex = (currentIndex + 1) % product.images.length;
            setSelectedIndex(product.images[nextIndex]);
        },
        onSwipedRight: () => {
            const currentIndex = product.images.indexOf(selectedImage);
            const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
            setSelectedImage(product.images[prevIndex]);
        },
        trackTouch: true,
    });

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`https://shop-easyb.vercel.app/api/products/${id}`);
          setProduct(res.data);
        } catch (err) {
          console.error("Failed to fetch product", err);
        }
      };
    
      fetchProduct();
    }, [id]);
    

    if (!product) {
        return <div>Sold out.</div>;
    }

    return (
//        
<div className="p-4 bg-white">
  {/* MOBILE: Swiper & Info */}
  <div className="md:hidden">
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      loop={false}
      pagination={{ clickable: true }}
      spaceBetween={16}
    >
      {product.images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            onClick={() => openModel(index)}
            src={image}
            alt={`${product.title} ${index + 1}`}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Mobile Info */}
    <div className="mt-4">
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      
      <p className="text-xl font-semibold">₹{product.price}</p>
      <p className="text-green-600 text-md">{product.offer}</p>
      <p className="mb-2 text-sm font-medium text-gray-700">Select Color:</p>
  <div className="flex gap-3 flex-wrap">
    {product.colors.map((color) => (
      <button
        key={color}
        onClick={() => setSelectedColor(color)}
        className={`flex items-center gap-2 px-3 py-1 border rounded-full ${
          selectedColor === color ? "ring-2 ring-black" : ""
        }`}
      >
        <div
          className="w-5 h-5 rounded-full border"
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-sm text-gray-800 capitalize">{color}</span>
      </button>
    ))}
  </div>
  <div className="mt-4">
  <p className="mb-1 text-sm font-medium">Select Size:</p>
  <div className="grid grid-cols-6 gap-2">
    {product.sizes.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`border px-3 py-1 text-sm rounded ${
          selectedSize === size ? "bg-black text-white" : "hover:bg-black hover:text-white"
        } transition`}
      >
        {size}
      </button>
    ))}
  </div>
</div>
      <div className="flex gap-4 mt-4 mb-3">
      <button
  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
  onClick={() => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
    });
  }}
>
  Add
</button>
        <p className="text-gray-700 mb-4">{product.desp}</p>
      </div>
      <Accordian
        title={product.title}
        content={product.desp || "No details available."}
      />
    </div>
  </div>

  {/* DESKTOP: Grid layout */}
  <div className="hidden md:grid grid-cols-3 gap-10 max-w-[1400px] mx-auto py-10 ">
    {/* Images */}
    <div className="col-span-2 grid grid-cols-2 ">
    {product.images?.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Product ${idx}`}
          onClick={() => openModel(idx)}
          className="w-full h-[600px] object-cover cursor-zoom-in hover:scale-[1.01] transition-transform"
        />
      ))}
    </div>

    {/* Product Info */}
    <div className="col-span-1 sticky top-10 space-y-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      
      <p className="text-xl font-semibold text-gray-800">₹{product.price}</p>
      <p className="text-green-600 text-md">{product.offer}</p>
      {/* <p className="text-gray-700">{product.desp}</p> */}
      <div className="mt-4">
      
  <p className="mb-2 text-sm font-medium text-gray-700">Select Color:</p>
  <div className="flex gap-3 flex-wrap">
    {product.colors.map((color) => (
      <button
        key={color}
        onClick={() => setSelectedColor(color)}
        className={`flex items-center gap-2 px-3 py-1 border rounded-full ${
          selectedColor === color ? "ring-2 ring-black" : ""
        }`}
      >
        <div
          className="w-5 h-5 rounded-full border"
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-sm text-gray-800 capitalize">{color}</span>
      </button>
    ))}
  </div>
  <p className="text-gray-700 text-sm ">{product.desp}</p>
</div>



<div className="mt-4">
  <p className="mb-1 text-sm font-medium">Select Size:</p>
  <div className="grid grid-cols-6 gap-2">
    {product.sizes.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`border px-3 py-1 text-sm rounded ${
          selectedSize === size ? "bg-black text-white" : "hover:bg-black hover:text-white"
        } transition`}
      >
        {size}
      </button>
    ))}
  </div>
</div>


      <div className="flex gap-4 mt-4">



        <button
  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
  onClick={() => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
    });
  }}
>
  Add
</button>





        <button className="underline text-sm text-gray-700">Check Availability</button>
      </div>
      <Accordian
        title={product.title}
        content={product.desp || "No details available."}
      />
      <Accordian
        title="Size and Fit"
        content="Please refer to the size chart for accurate measurements."
      />
        <Accordian
        title="Care Instructions"
        content="Machine wash cold, tumble dry low. Do not bleach. Iron on low heat."
      /> 
        <Accordian
        title="Shipping and Returns"
        content="Free shipping on orders over ₹500. Returns accepted within 30 days of purchase."
      />
    </div>
   

  </div>
  <SimilarProducts item={product} />
 
  
  {/* Fullscreen Modal Swiper */}
  {isModelOpen && (
    <div
      {...swipeHandlers}
      className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50"
    >
      <button
        className="absolute top-4 right-4 text-gray-600 text-2xl"
        onClick={closeModel}
      >
        &times;
      </button>
      <div className="max-w-3xl w-full bg-white p-4 rounded-lg shadow-lg">
        <Swiper
          initialSlide={selectedIndex}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${product.title} ${index + 1}`}
                className="w-full h-96 object-cover rounded-lg shadow"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    
    </div>
    
  )}
</div>

    );
};

export default ProductDetail;