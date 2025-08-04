import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, CircleUserRound, X } from "lucide-react";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { cart } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const navigate = useNavigate();

    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

    useEffect(() => {
        // Check if the user is logged in by checking for a token in localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
        setIsLoggedIn(false); // Update login state
        navigate("/"); // Redirect to home page
    };

    return (
        <nav className="w-full bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-black-800">
                    ShopEasy
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    <input
                        className="bg-white border-1 rounded-lg px-4"
                        placeholder="search"
                    />
                    <Link to="/" className="hover:text-gray-600">
                        <span className="text-sm">Home</span>
                    </Link>
                    <Link to="/ordertracking" className="hover:text-blue-600">
                        <span className="text-sm">My Orders</span>
                    </Link>
                    <Link to="/cart" className="hover:text-blue-600 relative">
                        <ShoppingCart className="inline-block w-5 h-5" />
                        {totalCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 rounded-full">
                                {totalCount}
                            </span>
                        )}
                    </Link>

                    {/* Show Login/Signup if not logged in, otherwise show Logout */}
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="hover:text-blue-600">
                                Login/SignUp
                            </Link>
                          
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="hover:text-red-600"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center justify-between">
                    <div className="px-4">
                        <input
                            className="bg-white border-1 border-purple-600 rounded-lg px-4"
                            placeholder="search"
                        />
                    </div>
                    <button onClick={() => setOpen(!open)}>
                        {open ? (
                            <X className="text-purple-600" />
                        ) : (
                            <CircleUserRound className="text-purple-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
                    <Link to="/" className="hover:text-gray-600">
                        Home
                    </Link>
                    <Link to="/ordertracking" className="hover:text-blue-600">
                        My Orders
                    </Link>
                    <Link to="/cart" className="hover:text-blue-600">
                        Cart
                    </Link>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="hover:text-blue-600">
                                Login/SignUp
                            </Link>
                           
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="hover:text-red-600 block"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;