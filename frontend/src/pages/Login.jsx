import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        

        return true;
    };



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const res = await fetch("https://shop-easyb.vercel.app/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("isAdmin", data.user.isAdmin);
            setSuccess("Login successful");
           
            if (data.user.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } else {
            setError(data.message || "Signup failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white  ">
             {success && <p className="text-grey-600 text-md mb-4">{success}</p>}
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <input
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    type="email"
                    className="w-full p-2 border rounded"
                />

                {/* Password Input with Toggle Visibility */}
                <div className="relative">
                    <input
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                        className="absolute right-2 top-2 text-gray-600"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gray-600 text-white py-2 rounded hover:bg-black transition-colors"
                >
                    Log In
                </button>
            </form>
             <p className="text-center mt-4 text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
        </div>
    );
};

export default Login;