import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { CalendarClock, LayoutDashboard, Heart, User, HeadphonesIcon, MapPin, Search } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const MyBookings = () => {
    const { user } = useAuthStore();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        let isMounted = true;
        const initBookings = async () => {
            try {
                const res = await axiosClient.get('/bookings');
                if (isMounted) {
                    setBookings(res.data.data);
                    setLoading(false);
                }
            } catch {
                if (isMounted) {
                    toast.error('Failed to load bookings');
                    setLoading(false);
                }
            }
        };
        initBookings();
        return () => { isMounted = false; };
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-500 text-[#15100B]';
            case 'Rejected': return 'bg-red-500 text-white';
            case 'Pending': return 'bg-yellow-500 text-[#15100B]';
            case 'Cancelled': return 'bg-gray-600 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const filteredBookings = statusFilter === 'All'
        ? bookings
        : bookings.filter(b => b.status === statusFilter);

    if (loading) return <div className="h-screen bg-[#15100B] flex items-center justify-center text-[#EF6C00]">Loading bookings...</div>;

    return (
        <div className="bg-[#15100B] min-h-screen text-[#FDFBF7] py-8">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row gap-8">

                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-4 sticky top-24">
                        <nav className="flex flex-col gap-2">
                            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119] text-sm font-semibold transition-colors">
                                <LayoutDashboard className="w-5 h-5" /> Dashboard
                            </Link>
                            <Link to="/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#EF6C00] text-[#15100B] text-sm font-bold transition-colors">
                                <CalendarClock className="w-5 h-5" /> My Bookings
                            </Link>
                            <Link to="/collections" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119] text-sm font-semibold transition-colors">
                                <Heart className="w-5 h-5" /> Saved Hotels
                            </Link>
                            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119] text-sm font-semibold transition-colors">
                                <User className="w-5 h-5" /> Profile Settings
                            </Link>
                            <Link to="/support" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119] text-sm font-semibold transition-colors">
                                <HeadphonesIcon className="w-5 h-5" /> Support
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">My Bookings</h1>
                            <p className="text-gray-400 text-sm mt-1">View and manage your current and past stays</p>
                        </div>

                        <div className="flex items-center gap-2 bg-[#1f1812] p-1.5 rounded-lg border border-[#3b2d22]">
                            {['All', 'Approved', 'Pending', 'Rejected'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${statusFilter === status ? 'bg-[#EF6C00] text-[#15100B]' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bookings List */}
                    <div className="mb-10">
                        {filteredBookings.length === 0 ? (
                            <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-16 text-center shadow-lg">
                                <Search className="w-12 h-12 text-[#EF6C00]/50 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">No bookings found</h3>
                                <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">You don't have any bookings matching this filter. Start exploring amazing stays across India.</p>
                                <Link to="/flats" className="inline-block bg-[#EF6C00] text-[#1a140f] px-8 py-3 rounded-lg font-bold hover:bg-[#fb8c00] transition-colors shadow-[0_0_15px_rgba(239,108,0,0.3)]">
                                    Explore Stays
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredBookings.map((booking) => (
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        key={booking._id}
                                        className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl overflow-hidden flex flex-col group cursor-pointer shadow-lg"
                                    >
                                        <div className="relative h-48">
                                            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider z-10 shadow-lg ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </div>
                                            <img
                                                src={booking.flat?.images?.[0] || 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                                alt="Stay"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#15100B] via-transparent to-transparent opacity-80 z-0"></div>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col relative z-10 bg-[#1f1812]">
                                            <h3 className="font-bold text-lg leading-tight mb-1 truncate">{booking.flat?.title || `Flat ${booking.flat?.flatNumber}`}</h3>
                                            <p className="flex items-center gap-1 text-xs text-gray-400 mb-5 truncate"><MapPin className="w-3.5 h-3.5" /> {booking.flat?.tower?.name}, India</p>

                                            <div className="flex justify-between items-center text-xs mt-auto bg-[#15100B] p-3 rounded-xl border border-[#3b2d22]">
                                                <div>
                                                    <div className="text-gray-500 font-semibold mb-1 uppercase tracking-wider text-[9px]">Check In</div>
                                                    <div className="font-bold text-[#FDFBF7]">{new Date(booking.moveInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                </div>
                                                <div className="w-px h-8 bg-[#3b2d22]"></div>
                                                <div>
                                                    <div className="text-gray-500 font-semibold mb-1 uppercase tracking-wider text-[9px]">Check Out</div>
                                                    <div className="font-bold text-[#FDFBF7]">Pending</div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-5 pt-5 border-t border-[#3b2d22]">
                                                <div className="font-bold text-[#EF6C00] text-lg">₹{booking.flat?.rent} <span className="text-[10px] text-gray-500 font-normal uppercase">Total</span></div>
                                                <button className="text-xs font-bold px-4 py-2 border border-[#3b2d22] rounded-lg hover:bg-[#EF6C00]/10 hover:text-[#EF6C00] hover:border-[#EF6C00]/50 transition-all">Manage</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
