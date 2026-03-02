import React from 'react';
import { Gift, Sparkles, Send, MapPin } from 'lucide-react';
import Footer from '../components/Footer';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const GiftVouchers = () => {
    return (
        <div className="bg-[#2a2119] min-h-screen text-[#FDFBF7] font-sans selection:bg-[#EF6C00]">

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#EF6C00]/10 border border-[#EF6C00]/30 text-[#EF6C00] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                            <Sparkles size={16} /> Give the Gift of Luxury
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            StayIndia <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF6C00] to-[#FBBF24]">Gift Vouchers</span>
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                            Whether it's a honeymoon, anniversary, or a simple retreat, the StayIndia experience is the ultimate gift. Valid across our entire portfolio of heritage palaces and luxury resorts.
                        </p>

                        <div className="flex gap-4">
                            <button className="bg-[#EF6C00] hover:bg-[#E65100] text-[#1a140f] font-bold px-8 py-4 rounded-xl transition shadow-lg flex items-center gap-2">
                                <Gift size={20} /> Buy a Voucher
                            </button>
                            <button className="bg-[#1f1812] hover:bg-[#15100B] border border-[#3b2d22] text-white font-bold px-8 py-4 rounded-xl transition">
                                Check Balance
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#EF6C00]/20 to-transparent blur-3xl rounded-full"></div>

                        {/* Actual Card Graphic */}
                        <div className="relative bg-gradient-to-br from-[#1a140f] to-[#15100B] p-8 md:p-10 rounded-[2rem] border border-[#3b2d22] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-3 hover:rotate-0 transition-transform duration-500">

                            <div className="flex justify-between items-start mb-24">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[#EF6C00] rounded-full flex items-center justify-center rounded-bl-none transform rotate-45">
                                        <div className="w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                    <span className="font-bold text-xl text-white tracking-wide">StayIndia</span>
                                </div>
                                <span className="bg-[#EF6C00]/20 text-[#EF6C00] px-3 py-1 rounded text-xs font-bold tracking-widest uppercase">E-Gift Card</span>
                            </div>

                            <div className="space-y-1">
                                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Digital Value</p>
                                <h3 className="text-4xl font-bold font-mono">₹50,000</h3>
                            </div>

                            {/* Simulated Chip/Pattern */}
                            <div className="absolute top-10 right-10 opacity-10">
                                <MapPin size={120} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="bg-[#1f1812] border border-[#3b2d22] p-8 rounded-2xl">
                        <Send className="text-[#EF6C00] w-10 h-10 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Instant Delivery</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Delivered directly to the recipient's email inbox within seconds, beautifully formatted with a personalized message.</p>
                    </div>
                    <div className="bg-[#1f1812] border border-[#3b2d22] p-8 rounded-2xl">
                        <MapPin className="text-[#EF6C00] w-10 h-10 mb-6" />
                        <h3 className="text-xl font-bold mb-3">No Restrictive Blackouts</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Vouchers can be used against any property across our 50+ destinations, including during peak holiday seasons.</p>
                    </div>
                    <div className="bg-[#1f1812] border border-[#3b2d22] p-8 rounded-2xl">
                        <Clock className="text-[#EF6C00] w-10 h-10 mb-6" />
                        <h3 className="text-xl font-bold mb-3">3-Year Validity</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Plenty of time to plan the perfect getaway. Our e-Gift cards remain valid for 36 months from the date of issue.</p>
                    </div>
                </div>

                {/* How to use */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">How to Redeem</h2>
                    <p className="text-gray-400 mb-10">Select your destination, choose your dates, and proceed to checkout. Add the unique 16-digit voucher PIN in the "Payments" section to instantly deduct the balance.</p>
                    <a href="/flats" className="text-[#EF6C00] font-bold uppercase tracking-wider text-sm hover:underline">Explore Destinations &gt;</a>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default GiftVouchers;
