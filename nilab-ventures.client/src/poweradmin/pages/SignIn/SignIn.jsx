 
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppFooter from "../../layout/AppFooter";
import api from "../../api/axios";
 
const SignIn = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Load saved username if remember me was checked
    useEffect(() => {
        const savedUsername = localStorage.getItem("rememberedUsername");
        if (savedUsername) {
            setUsername(savedUsername);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic validation
        if (!username.trim() || !password.trim()) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const res = await api.post("/login", {
                username,
                password,
            });

            // Handle remember me
            if (rememberMe) {
                localStorage.setItem("rememberedUsername", username);
            } else {
                localStorage.removeItem("rememberedUsername");
            }

            // Store user data
            localStorage.setItem("user", JSON.stringify(res.data));

            // Add a small delay for better UX
            setTimeout(() => {
                navigate("/poweradmin/dashboard");
            }, 500);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a1f1a] via-[#1a332b] to-[#0d1f1a]">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            {/* Center Content */}
            <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Card */}
                <div className="w-full max-w-[420px]">
                    {/* Decorative top bar */}
                    {/*<div className="h-2 w-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>*/}

                    {/* Main Card */}
                    <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-800/50 transform transition-all duration-300 hover:shadow-3xl">
                        {/* Logo Section */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                                <img
                                    src="https://www.nilabventures.com/images/poweradmin.png"
                                    alt="Nilab Ventures"
                                    className="h-28 w-auto object-contain relative z-10 drop-shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                                Please sign in to access your dashboard
                            </p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="ml-3 text-sm text-red-700 dark:text-red-300">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                                    Username
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 text-sm 
                                        bg-gray-50 dark:bg-gray-800/50
                                        border-2 border-gray-200 dark:border-gray-700
                                        rounded-xl
                                        text-gray-900 dark:text-gray-100
                                        placeholder-gray-400 dark:placeholder-gray-500
                                        focus:outline-none focus:border-green-500 dark:focus:border-green-400
                                        focus:ring-4 focus:ring-green-500/20
                                        transition-all duration-300
                                        hover:border-gray-300 dark:hover:border-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-12 py-3 text-sm 
                                        bg-gray-50 dark:bg-gray-800/50
                                        border-2 border-gray-200 dark:border-gray-700
                                        rounded-xl
                                        text-gray-900 dark:text-gray-100
                                        placeholder-gray-400 dark:placeholder-gray-500
                                        focus:outline-none focus:border-green-500 dark:focus:border-green-400
                                        focus:ring-4 focus:ring-green-500/20
                                        transition-all duration-300
                                        hover:border-gray-300 dark:hover:border-gray-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                                {/*<div className="text-sm">*/}
                                {/*    <a href="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors">*/}
                                {/*        Forgot password?*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full py-3 px-4 
                                bg-gradient-to-r from-green-600 to-blue-600
                                hover:from-green-700 hover:to-blue-700
                                text-white font-semibold rounded-xl
                                transform transition-all duration-300
                                hover:scale-[1.02] hover:shadow-xl
                                focus:outline-none focus:ring-4 focus:ring-green-500/50
                                disabled:opacity-70 disabled:cursor-not-allowed
                                disabled:hover:scale-100
                                overflow-hidden group"
                            >
                                <span className="relative z-10">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </button>
                             
                             
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
           

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                    20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
                .animate-shake {
                    animation: shake 0.6s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default SignIn;