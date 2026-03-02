import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { login, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const slides = ['/images/udaipur.jpg', '/images/goa.jpg', '/images/kerala.jpg'];

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex bg-[#15100B]">
            {/* Left Box - Image & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div className="absolute inset-0 bg-black/40 z-10" />

                {slides.map((slide, index) => (
                    <motion.img
                        key={slide}
                        src={slide}
                        alt="Destination"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                ))}

                <div className="relative z-20 flex flex-col justify-between p-12 h-full text-[#FDFBF7]">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-8 h-8 text-[#EF6C00]" />
                        <span className="text-2xl font-bold tracking-tight">StayIndia</span>
                    </div>

                    <div className="mb-20">
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            Experience Indian<br />Hospitality at its<br />Finest.
                        </h1>
                        <p className="text-lg text-gray-200 max-w-md">
                            From the royal palaces of Rajasthan to the serene backwaters of Kerala, unlock exclusive access to the country's most prestigious stays.
                        </p>
                    </div>

                    {/* Progress Dots Indicator (Mockup matching) */}
                    <div className="flex gap-2">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-500 ${currentSlide === index ? 'w-8 bg-[#EF6C00]' : 'w-4 bg-white/30'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Box - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 relative overflow-hidden">
                <div className="w-full max-w-md relative z-10">

                    {/* Mobile Branding (only shows on small screens) */}
                    <div className="flex lg:hidden items-center gap-2 mb-12 justify-center">
                        <Building2 className="w-8 h-8 text-[#EF6C00]" />
                        <span className="text-2xl font-bold tracking-tight text-[#FDFBF7]">StayIndia</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-[#FDFBF7] mb-2">Welcome Back</h2>
                        <p className="text-gray-400 mb-8 text-sm">Please enter your details to sign in to your account.</p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Email or Phone Number</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#1f1812] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] focus:ring-1 focus:ring-[#EF6C00] transition-colors placeholder:text-[#4d3c2e]"
                                    placeholder="name@company.com"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-semibold text-gray-400">Password</label>
                                    <Link to="#" className="text-xs font-semibold text-[#EF6C00] hover:text-[#fb8c00]">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#1f1812] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] focus:ring-1 focus:ring-[#EF6C00] transition-colors placeholder:text-[#4d3c2e] pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-[#3b2d22] bg-[#1f1812] text-[#EF6C00] focus:ring-[#EF6C00] focus:ring-offset-[#15100B]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-400">
                                    Remember me for 30 days
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-[#1a140f] bg-[#EF6C00] hover:bg-[#fb8c00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF6C00] focus:ring-offset-[#15100B] transition-colors"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>

                        {/* Social Login Divider */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#3b2d22]"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <span className="px-3 bg-[#15100B]">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <button className="w-full flex justify-center items-center py-2.5 px-4 border border-[#3b2d22] rounded-lg shadow-sm bg-[#1f1812] text-sm font-medium text-[#FDFBF7] hover:bg-[#2a2119] transition-colors">
                                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button className="w-full flex justify-center items-center py-2.5 px-4 border border-[#3b2d22] rounded-lg shadow-sm bg-[#1f1812] text-sm font-medium text-[#FDFBF7] hover:bg-[#2a2119] transition-colors">
                                    <svg className="h-5 w-5 mr-2 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.2 2.238.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    Apple
                                </button>
                            </div>
                        </div>

                        {/* Register Link */}
                        <div className="mt-10 text-center text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-[#EF6C00] hover:text-[#fb8c00] transition-colors">
                                Register for free
                            </Link>
                        </div>

                        {/* Footer links */}
                        <div className="mt-16 flex justify-center gap-6 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                            <Link to="#" className="hover:text-gray-300">Privacy Policy</Link>
                            <Link to="#" className="hover:text-gray-300">Terms of Service</Link>
                            <Link to="#" className="hover:text-gray-300">Help Center</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;
