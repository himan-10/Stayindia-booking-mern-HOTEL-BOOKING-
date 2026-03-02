import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-[#1a1614] border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#EF6C00] rounded-full flex items-center justify-center rounded-bl-none transform rotate-45">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className="font-bold text-xl text-white tracking-wide">StayIndia</span>
                    </Link>

                    <div className="hidden md:flex space-x-10 text-sm font-medium text-gray-300">
                        <Link to="/flats" className="hover:text-white transition">Destinations</Link>
                        <Link to="/collections" className="hover:text-white transition">Collections</Link>
                        <Link to="/offers" className="hover:text-white transition">Offers</Link>
                        <Link to="/support" className="hover:text-white transition">Support</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="text-white text-sm font-medium px-4 py-2 border border-[#EF6C00] rounded hover:bg-[#EF6C00]/10 transition">Profile</Link>
                                <button onClick={handleLogout} className="text-white text-sm font-medium px-4 py-2 border border-[#EF6C00] rounded hover:bg-[#EF6C00]/10 transition">Log out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-[#EF6C00] text-sm font-medium px-6 py-2 border border-[#EF6C00] rounded hover:bg-[#EF6C00]/10 transition">Log In</Link>
                                <Link to="/register" className="bg-[#EF6C00] text-white text-sm font-medium px-6 py-2 outline-none rounded hover:bg-[#E65100] transition shadow-lg">Join Now</Link>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};
export default Navbar;
