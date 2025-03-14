import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = async (e) => {
        e.preventDefault();
        let formErrors = {};

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(credentials.email)) {
            formErrors.email = "Please enter a valid email address.";
        }

      

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:3001/login", credentials, { withCredentials: true });

                if (response.status === 200) {
                    navigate("/create"); 
                }
            } catch (err) {
                console.error("Login failed", err);
                setErrors({ login: "Invalid email or password" });
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
                
                <form onSubmit={validateForm} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                            />
                            <span 
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Login Error Message */}
                    {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Registration Link */}
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
