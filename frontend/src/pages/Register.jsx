import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Eye, EyeOff, Lock, Mail, User as UserIcon } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { register, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Since backend doesn't take phone explicitly yet, we just pass name, email, password
        const success = await register(name, email, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#15100B]">
            <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
                <div className="flex justify-between items-center mb-10 w-full px-4 sm:px-0">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-8 h-8 text-[#EF6C00]" />
                        <span className="text-2xl font-bold tracking-tight text-[#FDFBF7]">StayIndia</span>
                    </div>
                    <div className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="px-4 py-2 border border-[#EF6C00] text-[#EF6C00] rounded-lg font-semibold hover:bg-[#EF6C00] hover:text-[#15100B] transition-colors">
                            Login
                        </Link>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#1f1812] py-10 px-6 sm:px-12 shadow-2xl sm:rounded-2xl border border-[#3b2d22] mx-4 sm:mx-0"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-[#FDFBF7] mb-2">Create Account</h2>
                        <p className="text-gray-400 text-sm">Join StayIndia for exclusive access to luxury stays across the subcontinent.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-4 w-4 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#EF6C00] focus:ring-1 focus:ring-[#EF6C00] transition-colors placeholder:text-[#4d3c2e]"
                                    placeholder="Mahatma Gandhi"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#EF6C00] focus:ring-1 focus:ring-[#EF6C00] transition-colors placeholder:text-[#4d3c2e]"
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1">Phone Number</label>
                            <div className="flex border border-[#3b2d22] rounded-lg overflow-hidden focus-within:border-[#EF6C00] focus-within:ring-1 focus-within:ring-[#EF6C00] transition-all">
                                <span className="bg-[#1f1812] border-r border-[#3b2d22] text-gray-400 flex items-center px-4 text-sm">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-[#15100B] text-[#FDFBF7] py-2.5 px-4 focus:outline-none placeholder:text-[#4d3c2e]"
                                    placeholder="00000 00000"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-2.5 pl-10 pr-10 focus:outline-none focus:border-[#EF6C00] focus:ring-1 focus:ring-[#EF6C00] transition-colors placeholder:text-[#4d3c2e]"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1.5">Must be at least 8 characters with a mix of letters and numbers.</p>
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-start pt-2">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 rounded border-[#3b2d22] bg-[#15100B] text-[#EF6C00] focus:ring-[#EF6C00] focus:ring-offset-[#1f1812]"
                                />
                            </div>
                            <div className="ml-3 text-xs">
                                <label htmlFor="terms" className="text-gray-400">
                                    I agree to the <span className="font-semibold text-[#EF6C00] cursor-pointer hover:text-[#fb8c00]">Terms of Service</span> and <span className="font-semibold text-[#EF6C00] cursor-pointer hover:text-[#fb8c00]">Privacy Policy</span>, including cookie usage.
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-[#1a140f] bg-[#EF6C00] hover:bg-[#fb8c00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF6C00] focus:ring-offset-[#1f1812] transition-colors"
                            >
                                Create My Account →
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            Prefer to use another method? <span className="font-semibold text-[#FDFBF7] cursor-pointer hover:underline">View other options</span>
                        </p>
                    </div>
                </motion.div>

                <div className="mt-12 text-center text-xs text-[#4d3c2e] uppercase tracking-wider font-semibold">
                    © 2024 StayIndia Luxury Travel Group. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Register;
