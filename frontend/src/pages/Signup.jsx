import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        if (!mobileRegex.test(form.mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (!validateForm()) return;

        const res = await fetch("https://shop-easyb.vercel.app/api/auth/signup", {
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
            setSuccess("Signup successful");
            navigate("/");
        } else {
            setError(data.message || "Signup failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white ">
             {success && <p className="text-grey-600 text-md mb-4">{success}</p>}
            <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    type="text"
                    className="w-full p-2 border rounded"
                />
                <input
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    type="email"
                    className="w-full p-2 border rounded"
                />
                <input
                    name="mobile"
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                    type="text"
                    className="w-full p-2 border rounded"
                />
                <div className="relative">
                    <input
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        type={showPassword ? "text" : "password"}
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-600"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-600 text-white py-2 rounded hover:bg-black transition-colors"
                >
                    Signup
                </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Signup;