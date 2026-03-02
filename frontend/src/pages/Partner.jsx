import React from 'react';
import { Handshake, TrendingUp, CalendarCheck, ShieldCheck } from 'lucide-react';
import Footer from '../components/Footer';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const Partner = () => {
    return (
        <div className="bg-[#2a2119] min-h-screen text-white font-sans selection:bg-[#EF6C00] selection:text-white">
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Grow Your Hospitality Business With Us</h1>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Join StayIndia's exclusive network of premium heritage and luxury properties. We provide the technology, reach, and marketing expertise to maximize your occupancy and revenue.
                        </p>

                        <div className="space-y-6 mb-10">
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#EF6C00]/20 p-3 rounded-lg text-[#EF6C00]">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Increased Visibility</h3>
                                    <p className="text-sm text-gray-400">Reach millions of high-intent travelers globally who are looking for authentic luxury experiences.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#EF6C00]/20 p-3 rounded-lg text-[#EF6C00]">
                                    <CalendarCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Optimized Bookings</h3>
                                    <p className="text-sm text-gray-400">Our dynamic pricing algorithms ensure you get the best RevPAR across all seasons.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#EF6C00]/20 p-3 rounded-lg text-[#EF6C00]">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Verified Guests</h3>
                                    <p className="text-sm text-gray-400">Every guest is verified to ensure the safety and sanctity of your premium property.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1f1812] border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-2">Become a Partner</h2>
                        <p className="text-sm text-gray-400 mb-8">Fill out the details below and our onboarding team will reach out within 24 hours.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-[#15100B] border border-[#3b2d22] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] transition-colors" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-[#15100B] border border-[#3b2d22] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] transition-colors" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-[#15100B] border border-[#3b2d22] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Property Name</label>
                                <input type="text" className="w-full bg-[#15100B] border border-[#3b2d22] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] transition-colors" placeholder="e.g. Royal Heritage Resort" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2">Location / City</label>
                                <input type="text" className="w-full bg-[#15100B] border border-[#3b2d22] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] transition-colors" placeholder="Jaipur, Rajasthan" />
                            </div>
                            <button type="button" className="w-full bg-[#EF6C00] hover:bg-[#E65100] text-[#1a140f] font-bold py-4 rounded-lg transition-colors mt-4">
                                Submit Application
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Partner;
