import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import Footer from '../components/Footer';
/* eslint-disable-next-line no-unused-vars */

import { motion } from 'framer-motion';

const Home = () => {
       const navigate = useNavigate();
const [location, setLocation] = useState("");
    return (
     
        
        <div className="bg-[#2a2119] min-h-screen text-white font-sans selection:bg-[#EF6C00] selection:text-white">
            {/* Hero Section */}
            <div className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative h-[600px] rounded-[32px] overflow-hidden shadow-2xl"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1650703974678-6a71a9f48a5b?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Taj Mahal"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
                        >
                            Experience the Soul <br /> of India
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-xl text-gray-200 max-w-2xl mb-12"
                        >
                            Discover handpicked heritage palaces and luxury resorts across the vibrant heart of the subcontinent.
                        </motion.p>

                        {/* Search Bar Plugin */}
                       <motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.4 }}
className="bg-black/40 backdrop-blur-md border border-white/20 p-2 rounded-xl flex flex-col md:flex-row items-center gap-2 w-full max-w-4xl"
>

<div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b md:border-b-0 md:border-r border-white/20">
<MapPin className="text-[#EF6C00]" size={20} />
<div className="flex flex-col text-left">
<input
  type="text"
  placeholder="Where to?"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      navigate(`/flats?city=${location}`);
    }
  }}
  className="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-full"
/>
</div>
</div>

<div className="flex-1 flex items-center gap-3 px-4 py-3 w-full border-b md:border-b-0 md:border-r border-white/20">
<Calendar className="text-[#EF6C00]" size={20} />
<div className="flex flex-col text-left">
<input
type="text"
placeholder="Dates"
className="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-full"
onFocus={(e)=>e.target.type='date'}
onBlur={(e)=>e.target.type='text'}
/>
</div>
</div>

<div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
<Users className="text-[#EF6C00]" size={20} />
<div className="flex flex-col text-left">
<input
type="text"
placeholder="Guests"
className="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-full"
/>
</div>
</div>

<button
onClick={()=>navigate(`/flats?city=${location}`)}
className="bg-[#EF6C00] hover:bg-[#E65100] text-white px-8 py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition w-full md:w-auto h-full"
>
<Search size={20} />
Search
</button>

</motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Curated Collections */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Curated Collections</h2>
                        <p className="text-[#EF6C00] text-sm font-medium">Signature stays for the discerning traveler</p>
                    </div>
                    <button className="text-[#EF6C00] text-sm font-medium hover:underline flex items-center gap-1">View All &gt;</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div whileHover={{ y: -10 }} className="group cursor-pointer">
                        <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                            <img src="https://plus.unsplash.com/premium_photo-1661930618375-aafabc2bf3e7?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Heritage Palaces" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className="absolute bottom-4 left-4 bg-[#EF6C00] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Heritage</div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Heritage Palaces</h3>
                        <p className="text-gray-400 text-sm">Relive the royal era in historic forts and regal mansions.</p>
                    </motion.div>

                    <motion.div whileHover={{ y: -10 }} className="group cursor-pointer">
                        <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                            <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Beach Resorts" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className="absolute bottom-4 left-4 bg-[#EF6C00] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Coastal</div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Beach Resorts</h3>
                        <p className="text-gray-400 text-sm">Pristine shores and private villas across Goa and Kerala.</p>
                    </motion.div>

                    <motion.div whileHover={{ y: -10 }} className="group cursor-pointer">
                        <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                            <img src="https://images.unsplash.com/photo-1686178274108-f47a1f560aed?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Spiritual Retreats" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className="absolute bottom-4 left-4 bg-[#EF6C00] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Wellness</div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Spiritual Retreats</h3>
                        <p className="text-gray-400 text-sm">Rejuvenate in the foothills of the serene Himalayas.</p>
                    </motion.div>
                </div>
            </div>

            {/* Top Destinations */}
            <div className="bg-[#362a20] py-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-3">Top Destinations</h2>
                        <p className="text-gray-400 text-sm max-w-2xl mx-auto">Explore India's most loved cities, from the Pink City of Jaipur to the tranquil backwaters of Kerala.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div whileHover={{ scale: 1.03 }} className="relative h-[400px] rounded-xl overflow-hidden group cursor-pointer">
                            <img src="/jaipur.jpg" alt="Jaipur" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-bold text-white mb-1">Jaipur</h3>
                                <p className="text-gray-300 text-xs">240+ Properties</p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} className="relative h-[400px] rounded-xl overflow-hidden group cursor-pointer">
                            <img src="/goa.jpg" alt="Goa" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-bold text-white mb-1">Goa</h3>
                                <p className="text-gray-300 text-xs">315+ Properties</p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} className="relative h-[400px] rounded-xl overflow-hidden group cursor-pointer">
                            <img src="/kerala.jpg" alt="Kerala" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-bold text-white mb-1">Kerala</h3>
                                <p className="text-gray-300 text-xs">180+ Properties</p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} className="relative h-[400px] rounded-xl overflow-hidden group cursor-pointer">
                            <img src="/udaipur.jpg" alt="Udaipur" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-bold text-white mb-1">Udaipur</h3>
                                <p className="text-gray-300 text-xs">110+ Properties</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Testimonial */}
            <div className="py-24 max-w-4xl mx-auto px-4 text-center">
                <div className="text-[#EF6C00] text-6xl font-serif leading-none mb-6">"</div>
                <h3 className="text-2xl md:text-3xl font-light text-white italic mb-10 leading-relaxed">
                    "StayIndia transformed our family vacation. Staying at the Rambagh Palace was like stepping back in time with all the modern comforts. Truly world-class service."
                </h3>
                <div className="flex items-center justify-center gap-4">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="User" className="w-12 h-12 rounded-full object-cover" />
                    <div className="text-left">
                        <h4 className="text-white font-medium text-sm">Ananya Sharma</h4>
                        <p className="text-gray-500 text-[10px] tracking-widest uppercase">Global Travel Enthusiast</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
