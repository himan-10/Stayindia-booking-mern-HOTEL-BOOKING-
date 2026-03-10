import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Star, Heart, Share, MapPin, Award, Shield, Wifi, Car, Tv, Wind, CheckCircle, ArrowLeft } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';

import { heritageImages } from '../utils/images';

const FlatDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Check if flat data was passed from Flats.jsx via Link state
    const passedFlat = location.state?.flat;

    const [flat, setFlat] = useState(passedFlat || null);
    const [loading, setLoading] = useState(!passedFlat);
    const { isAuthenticated } = useAuthStore();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    // If flat wasn't passed via state, fetch it (or fallback to mock data)
    useEffect(() => {
        if (passedFlat) return; // We already have the data

        const fetchFlat = async () => {
            try {
                const res = await axiosClient.get(`/flats/${id}`);
                setFlat(res.data.data);
            } catch {
                // Fallback to beautiful mock data for demo purposes
                setFlat({
                    _id: id || 'mock-id',
                    name: 'The Oberoi Amarvilas Luxury Suite',
                    city: 'Agra',
                    price: 25000,
                    rating: 4.96,
                    reviews: 128,
                    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar"],
                    image: heritageImages[5] // Taj Mahal
                });
            }
            setLoading(false);
        };
        fetchFlat();
    }, [id, passedFlat]);

    const handleReserve = async () => {
        if (!isAuthenticated) return toast.info('Please log in to reserve');
        if (!checkIn) return toast.error('Check-in date is required');
        if (!checkOut) return toast.error('Check-out date is required');

        // Redirect to checkout page with checkout flow
        navigate(`/checkout/${flat._id || id}`);
    };

    if (loading) return (
        <div className="h-screen w-full bg-[#1f1812] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EF6C00]"></div>
        </div>
    );

    // Create a gallery out of the main image + a few random heritage ones for the grid
    const mainImage = flat.image || heritageImages[0];
    const getGalleryImages = () => {
        const hash = (flat.name || '').length;
        return [
            mainImage,
            heritageImages[(hash + 1) % heritageImages.length],
            heritageImages[(hash + 3) % heritageImages.length],
            heritageImages[(hash + 5) % heritageImages.length],
            heritageImages[(hash + 7) % heritageImages.length],
        ];
    };
    const gallery = getGalleryImages();

    // Calculate Price logic for the sidebar
    const pricePerNight = flat.price || 5000;
    const nightCount = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))) : 1;
    const baseTotal = pricePerNight * nightCount;
    const cleaningFee = 500;
    const serviceFee = Math.round(baseTotal * 0.1); // 10%
    const finalTotal = baseTotal + cleaningFee + serviceFee;

    return (
        <div className="bg-[#1f1812] min-h-screen text-white font-sans selection:bg-[#EF6C00] selection:text-white pt-24 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Back Button & Header */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
                >
                    <ArrowLeft size={16} /> Back to Search
                </button>

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {flat.name || flat.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-gray-300">
                            <span className="flex items-center gap-1 text-[#EF6C00]">
                                <Star size={16} className="fill-current" /> {flat.rating || 4.8}
                                <span className="text-gray-400 font-normal ml-1">({flat.reviews || 42} reviews)</span>
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="flex items-center gap-1 text-gray-300">
                                <Award size={16} className="text-[#EF6C00]" /> Premium Property
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="flex items-center gap-1 text-gray-300 underline underline-offset-4 decoration-white/20 hover:decoration-white transition cursor-pointer">
                                <MapPin size={16} /> {flat.city}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 shrink-0">
                        <button className="flex items-center gap-2 hover:bg-white/5 border border-white/10 px-4 py-2 rounded-lg transition text-sm font-medium">
                            <Share size={16} /> Share
                        </button>
                        <button className="flex items-center gap-2 hover:bg-white/5 border border-white/10 px-4 py-2 rounded-lg transition text-sm font-medium text-[#EF6C00]">
                            <Heart size={16} className="fill-[#EF6C00]/20" /> Save
                        </button>
                    </div>
                </div>

                {/* Luxury Image Gallery Grid */}
                <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[50vh] min-h-[400px] max-h-[600px] rounded-2xl overflow-hidden cursor-pointer mb-12 border border-white/10">
                    <div className="col-span-4 md:col-span-2 row-span-2 relative group">
                        <img src={gallery[0] || "/goa.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Main property view" onError={(e) => { e.target.onerror = null; e.target.src = '/goa.jpg'; }} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300"></div>
                    </div>
                    <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden">
                        <img src={gallery[1]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Property detail 1" onError={(e) => { e.target.onerror = null; e.target.src = '/rishikesh1.jpg'; }} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300"></div>
                    </div>
                    <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden">
                        <img src={gallery[2]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Property detail 2" onError={(e) => { e.target.onerror = null; e.target.src = '/rishikesh2.jpg'; }} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300"></div>
                    </div>
                    <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden">
                        <img src={gallery[3]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Property detail 3" onError={(e) => { e.target.onerror = null; e.target.src = '/hotel1.jpg'; }} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300"></div>
                    </div>
                    <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden">
                        <img src={gallery[4]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Property detail 4" onError={(e) => { e.target.onerror = null; e.target.src = '/rishikesh2.jpg'; }} />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
                            <span className="text-white font-medium border border-white/30 backdrop-blur-md px-4 py-2 rounded-lg bg-black/30">View all photos</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 text-gray-300">

                        {/* Host Overview */}
                        <div className="flex justify-between items-center pb-8 border-b border-white/10">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Hosted by StayIndia Premium</h2>
                                <p className="text-gray-400 text-sm">
                                    {guests} guest{guests > 1 ? 's' : ''} • Luxury Suite • Dedicated Concierge
                                </p>
                            </div>
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Host" className="w-16 h-16 rounded-full object-cover border-2 border-[#EF6C00]" />
                                <div className="absolute -bottom-1 -right-1 bg-[#EF6C00] text-white p-1 rounded-full border-2 border-[#1f1812]">
                                    <Shield size={12} />
                                </div>
                            </div>
                        </div>

                        {/* Distinctive Features */}
                        <div className="py-8 border-b border-white/10 space-y-6">
                            <div className="flex gap-4 items-start">
                                <Award className="w-8 h-8 text-[#EF6C00] shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg text-white mb-1">StayIndia Superhost</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Superhosts are highly rated, experienced hosts committed to providing outstanding stays for guests.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <MapPin className="w-8 h-8 text-[#EF6C00] shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg text-white mb-1">Prime Location</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Guests consistently rate the area highly for its heritage architecture, safety, and cultural significance.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <CheckCircle className="w-8 h-8 text-[#EF6C00] shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg text-white mb-1">Free Cancellation</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Cancel before check-in for a full refund, no questions asked.</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="py-8 border-b border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">About this space</h2>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Experience the pinnacle of luxury in {flat.city}. This meticulously designed property merges traditional Indian heritage with modern, world-class amenities ensuring maximum comfort and style. Whether you're unwinding by the private pool, taking in the panoramic views, or enjoying high-speed connectivity, this property caters to your every desire.
                            </p>
                            <span className="font-bold text-[#EF6C00] hover:underline cursor-pointer flex items-center gap-1 w-max">
                                Show more <CheckCircle size={14} className="rotate-90" />
                            </span>
                        </div>

                        {/* Amenities */}
                        <div className="py-8">
                            <h2 className="text-2xl font-bold text-white mb-6">What this luxury stay offers</h2>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {(flat.amenities || ["WiFi", "Air conditioning", "Dedicated workspace", "Free parking", "Pool"]).map((amenity, i) => (
                                    <div key={i} className="flex gap-4 items-center text-gray-300 pb-2 border-b border-white/5">
                                        <CheckCircle className="text-[#EF6C00]" size={18} />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 border border-white/20 hover:border-white/50 text-white px-6 py-3 rounded-lg font-bold transition">
                                Show all amenities
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Booking Card */}
                    <div className="hidden lg:block">
                        <div className="bg-[#15100B] border border-white/10 rounded-2xl p-6 shadow-2xl sticky top-28">
                            <div className="flex items-end justify-between mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white">₹{pricePerNight.toLocaleString()}</span>
                                    <span className="text-gray-400 text-sm font-medium">/ night</span>
                                </div>
                                <span className="text-sm font-medium text-gray-400 hover:text-white transition cursor-pointer underline underline-offset-4 decoration-white/20">
                                    {flat.reviews || 84} reviews
                                </span>
                            </div>

                            <div className="border border-white/20 rounded-xl mb-4 overflow-hidden bg-[#1f1812]">
                                <div className="flex border-b border-white/20">
                                    <div className="w-1/2 p-3 border-r border-white/20">
                                        <label className="uppercase text-[10px] font-bold text-gray-500 tracking-wider">Check-in</label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={e => setCheckIn(e.target.value)}
                                            className="w-full bg-transparent text-white outline-none text-sm font-medium mt-1 cursor-pointer"
                                        />
                                    </div>
                                    <div className="w-1/2 p-3">
                                        <label className="uppercase text-[10px] font-bold text-gray-500 tracking-wider">Checkout</label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={e => setCheckOut(e.target.value)}
                                            className="w-full bg-transparent text-white outline-none text-sm font-medium mt-1 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <label className="uppercase text-[10px] font-bold text-gray-500 tracking-wider">Guests</label>
                                    <select
                                        value={guests}
                                        onChange={e => setGuests(parseInt(e.target.value))}
                                        className="w-full outline-none text-sm font-medium mt-1 bg-transparent text-white cursor-pointer appearance-none"
                                    >
                                        <option value={1} className="text-black">1 guest</option>
                                        <option value={2} className="text-black">2 guests</option>
                                        <option value={3} className="text-black">3 guests</option>
                                        <option value={4} className="text-black">4 guests</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={handleReserve}
                                className="w-full bg-[#EF6C00] hover:bg-[#E65100] text-white rounded-xl py-4 font-bold text-lg transition shadow-lg hover:shadow-[#EF6C00]/20"
                            >
                                Reserve
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-4 font-medium">You won't be charged yet</p>

                            {checkIn && checkOut && nightCount > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-6 flex flex-col gap-3 text-gray-300 border-t border-white/10 pt-6"
                                >
                                    <div className="flex justify-between">
                                        <span className="underline decoration-white/20 underline-offset-4">₹{pricePerNight.toLocaleString()} x {nightCount} night{nightCount > 1 ? 's' : ''}</span>
                                        <span>${baseTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline decoration-white/20 underline-offset-4">Cleaning fee</span>
                                        <span>₹{cleaningFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline decoration-white/20 underline-offset-4">StayIndia service fee</span>
                                        <span>₹{serviceFee.toLocaleString()}</span>
                                    </div>
                                    <div className="my-2 border-t border-white/10" />
                                    <div className="flex justify-between font-bold text-xl text-white">
                                        <span>Total</span>
                                        <span className="text-[#EF6C00]">₹{finalTotal.toLocaleString()}</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default FlatDetails;
