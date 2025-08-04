import { Link } from "react-router-dom"
import { House, Blocks, ShoppingCart } from 'lucide-react';
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
const bottomNavbar = () => {
 const { cart } = useContext(CartContext);
   
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    return (
        <nav className="w-full bg-white-800 text-white shadow-inner fixed left-0 border-t bottom-0 z-50 md:hidden">
            <div className="flex justify-around items-center h-14 text-sm">
                <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                    <span className="material-icons"><House /></span>
                    <span className="text-xs">Home</span>
                </Link>
                <Link to="/products" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                    <span className="material-icons"><Blocks /></span>
                    <span className="text-xs">Products</span>
                </Link>

                <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-600 relative">
                    <ShoppingCart className="w-5 h-6 inline"/>
                    {totalCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 rounded-full">
                            {totalCount}
                        </span>
                      
                    )}
                      <span className="text-xs">Cart</span>
                </Link>

            </div>

        </nav>
    );
}

export default bottomNavbar;