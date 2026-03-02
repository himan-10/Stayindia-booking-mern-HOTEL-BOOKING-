import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { LayoutDashboard, CalendarClock, Heart, User, HeadphonesIcon, Bell, Plus, ChevronRight, Award, MapPin } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuthStore();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

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
            default: return 'bg-gray-500 text-white';
        }
    };

    if (loading) return <div className="h-screen bg-[#15100B] flex items-center justify-center text-[#EF6C00]">Loading dashboard...</div>;

    return (
        <div className="bg-[#15100B] min-h-screen text-[#FDFBF7] py-8">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row gap-8">

                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-4 sticky top-24">
                        <nav className="flex flex-col gap-2">
                            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#EF6C00] text-[#15100B] text-sm font-bold transition-colors">
                                <LayoutDashboard className="w-5 h-5" /> Dashboard
                            </Link>
                            <Link to="/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119] text-sm font-semibold transition-colors">
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

                    {/* Platinum Upgrade Banner */}
                    < div className="mt-6 bg-gradient-to-br from-[#EF6C00] to-[#b04b00] rounded-2xl p-6 text-[#FDFBF7] relative overflow-hidden" >
                        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-white/80">Membership Plan</div>
                        <h3 className="text-xl font-bold mb-4">Upgrade to Platinum</h3>
                        <button className="w-full py-2.5 bg-white text-[#b04b00] font-bold text-sm rounded-lg hover:bg-gray-100 transition-colors">
                            View Benefits
                        </button>
                    </div >

                    {/* Small Profile Card inline */}
                    < div className="mt-6 flex items-center gap-3 p-4" >
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=EF6C00&color=fff`}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border border-[#3b2d22]"
                        />
                        <div>
                            <div className="text-sm font-bold">{user?.name || 'Guest'}</div>
                            <div className="text-xs text-[#EF6C00] font-semibold">Gold Member</div>
                        </div>
                    </div >
                </div >

                {/* Main Content Area */}
                < div className="flex-1" >

                    {/* Header */}
                    < div className="flex justify-between items-center mb-8" >
                        <div>
                            <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'Guest'}</h1>
                            <p className="text-gray-400 text-sm mt-1">Manage your stays and rewards at StayIndia</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1f1812] border border-[#3b2d22] text-[#FDFBF7] hover:bg-[#2a2119] transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#EF6C00] rounded-full"></span>
                            </button>
                            <Link to="/flats" className="hidden sm:flex items-center gap-2 bg-[#EF6C00] text-[#1a140f] px-4 py-2 rounded-lg font-bold hover:bg-[#fb8c00] transition-colors">
                                <Plus className="w-4 h-4" /> New Booking
                            </Link>
                        </div>
                    </div >

                    {/* Stats Grid */}
                    < div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" >
                        <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><Award className="w-3 h-3 text-[#EF6C00]" /> Loyalty Points</div>
                            </div>
                            <div className="text-3xl font-bold mb-1">12,450</div>
                            <div className="text-xs text-green-500 flex items-center gap-1">+ 450 points from last stay</div>
                        </div>
                        <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-5"><Award className="w-32 h-32" /></div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Current Tier</div>
                            <div className="text-3xl font-bold text-[#EF6C00] mb-1">Gold <span className="text-xl text-[#FDFBF7]">Member</span></div>
                            <div className="text-xs text-gray-500">2,550 points to reach Platinum</div>
                        </div>
                        <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Balance</div>
                            </div>
                            <div className="text-3xl font-bold mb-1">₹4,200</div>
                            <div className="text-xs text-gray-500">Available for next booking</div>
                        </div>
                    </div >

                    {/* Upcoming Bookings */}
                    < div className="mb-10" >
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-xl font-bold">Upcoming Bookings</h2>
                            <Link to="/flats" className="text-sm font-semibold text-[#EF6C00] hover:underline">View All</Link>
                        </div>

                        {
                            bookings.length === 0 ? (
                                <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-10 text-center">
                                    <CalendarClock className="w-12 h-12 text-[#EF6C00]/50 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold mb-2">No upcoming trips</h3>
                                    <p className="text-sm text-gray-400 mb-6">You don't have any bookings right now. Start exploring amazing stays across India.</p>
                                    <Link to="/flats" className="inline-block bg-[#EF6C00] text-[#1a140f] px-6 py-2.5 rounded-lg font-bold hover:bg-[#fb8c00] transition-colors">
                                        Explore Stays
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {bookings.map((booking) => (
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            key={booking._id}
                                            className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
                                        >
                                            <div className="relative h-40">
                                                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider z-10 ${getStatusColor(booking.status)}`}>
                                                    {booking.status}
                                                </div>
                                                <img
                                                    src={booking.flat?.images?.[0] || 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                                    alt="Stay"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1812] to-transparent"></div>
                                            </div>

                                            <div className="p-5 flex-1 flex flex-col">
                                                <h3 className="font-bold text-lg leading-tight mb-1 truncate">{booking.flat?.title || `Flat ${booking.flat?.flatNumber}`}</h3>
                                                <p className="flex items-center gap-1 text-xs text-gray-400 mb-4 truncate"><MapPin className="w-3 h-3" /> {booking.flat?.tower?.name}, India</p>

                                                <div className="flex justify-between items-center text-xs mt-auto bg-[#15100B] p-3 rounded-xl border border-[#3b2d22]">
                                                    <div>
                                                        <div className="text-gray-500 font-semibold mb-1 uppercase tracking-wider text-[9px]">Check In</div>
                                                        <div className="font-bold">{new Date(booking.moveInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                    </div>
                                                    <div className="w-px h-8 bg-[#3b2d22]"></div>
                                                    <div>
                                                        <div className="text-gray-500 font-semibold mb-1 uppercase tracking-wider text-[9px]">Check Out</div>
                                                        <div className="font-bold">Pending</div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#3b2d22]">
                                                    <div className="font-bold text-[#EF6C00]">₹{booking.flat?.rent} <span className="text-[10px] text-gray-500 font-normal uppercase">Total</span></div>
                                                    <button className="text-xs font-semibold hover:text-[#EF6C00] transition-colors">Manage</button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )
                        }
                    </div >

                    {/* Recent Destinations (Static Visualized) */}
                    < div >
                        <h2 className="text-xl font-bold mb-6">Your Recent Destinations</h2>
                        <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl h-64 relative overflow-hidden flex items-center justify-center p-6">
                            {/* Abstract Map Background */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>

                            <div className="grid grid-cols-3 gap-8 relative z-10 w-full max-w-lg">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-[#EF6C00]/20 flex items-center justify-center mb-3 relative">
                                        <MapPin className="text-[#EF6C00] w-6 h-6" />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#1f1812]"></div>
                                    </div>
                                    <div className="font-bold text-sm">Goa</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Dec 2023</div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-[#EF6C00]/20 flex items-center justify-center mb-3 relative">
                                        <MapPin className="text-[#EF6C00] w-6 h-6" />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#1f1812]"></div>
                                    </div>
                                    <div className="font-bold text-sm">Bangalore</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Oct 2023</div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3 relative">
                                        <MapPin className="text-gray-400 w-6 h-6" />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gray-500 border-2 border-[#1f1812]"></div>
                                    </div>
                                    <div className="font-bold text-sm text-gray-400">Mumbai</div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Aug 2023</div>
                                </div>
                            </div>

                            {/* Decorative line connecting nodes */}
                            <div className="absolute top-[48%] left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#EF6C00]/30 to-transparent z-0"></div>

                            {/* Badge */}
                            <div className="absolute bottom-6 right-6 bg-[#15100B] border border-[#3b2d22] px-4 py-2 rounded-lg">
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Visits</div>
                                <div className="font-bold text-lg">12 Cities</div>
                            </div>
                        </div>
                    </div >

                </div >
            </div >
        </div >
    );
};

export default Dashboard;
