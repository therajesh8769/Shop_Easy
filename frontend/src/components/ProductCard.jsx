import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
//import { getCart,addToCart,clearCart } from '../utils/cartUtils';

import { CartContext } from '../context/CartContext';







const ProductCard = ({ item }) => {
    const { addToCart, removeFromCart, clearCart } = useContext(CartContext);

    const [imgIndex, setImgIndex] = useState(0);
    const handleMouseEnter = () => {
        if (item.images.length > 1) setImgIndex(1);

    }
    const handleMouseLeave = () => {
        setImgIndex(0);
    }
    const handleTouchStart = () => {
        if (item.images.length > 1) {
            setImgIndex((prev) => (prev === 0 ? 1 : 0))
        }
    }
    return (

        <Link to={`/product/${item.id}`} className="no-underline text-black">
            <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}>
                <img
                    src={item.images[imgIndex]}
                    alt={item.title}
                    className="w-full h-80 object-cover rounded-t-md transition-transform duration-300 transform hover:scale-105"
                />
                <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                <p className="text-gray-600 mt-1  text-center">{item.desp}</p>
                <p className="text-xl  mt-2 ">
                    <span className='font-bold'>₹{item.price}</span>
                    <span className='text-green-600 ml-3 text-md'>{item.offer}</span>
                </p>
               

                {item.sizes && item.sizes.length > 0 && (
                    <div className="flex items-center gap-2 mt-4 mb-4 flex-wrap">
                        <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Sizes:
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {item.sizes.map((size) => (
                                <span
                                    key={size}
                                    className=" border border-gray-100 px-2 py-0.4 text-xs rounded text-black-800 bg-white-100"
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>
                )}



                <div className="flex justify-between items-center mt-1 rounded-lg">
                    <button
                        className=" bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-purple-800 transition-colors text-sm"
                        onClick={() => addToCart(item)}
                    >Add</button>

                </div>
            </div>


        </Link>

    );
}

export default ProductCard