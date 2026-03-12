import React from 'react';
import { MapPin, Star, Shield, Award } from 'lucide-react';
import Footer from '../components/Footer';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-[#2a2119] min-h-screen text-white font-sans selection:bg-[#EF6C00] selection:text-white">
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About StayIndia</h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-16">
                        We believe that true luxury lies in the experience. StayIndia was founded with a singular vision: to curate the finest heritage properties, boutique hotels, and luxury resorts across the Indian subcontinent.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img
                            src="/about.jpeg"
                            alt="Heritage"
                            className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-bold">Our Heritage</h2>
                        <p className="text-gray-400 leading-relaxed">
                            India is a land of stories, where every fort and palace has a tale to tell. We handpick stays that not only offer unparalleled comfort but also preserve the cultural and historical legacy of their surroundings. From the royal grandeur of Rajasthan to the tranquil backwaters of Kerala, our properties are a gateway to India's soul.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-[#1f1812] p-6 rounded-xl border border-white/10">
                                <MapPin className="text-[#EF6C00] mb-4" size={32} />
                                <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                                <p className="text-sm text-gray-400">Curated Destinations</p>
                            </div>
                            <div className="bg-[#1f1812] p-6 rounded-xl border border-white/10">
                                <Star className="text-[#EF6C00] mb-4" size={32} />
                                <h3 className="text-2xl font-bold text-white mb-2">9.8/10</h3>
                                <p className="text-sm text-gray-400">Average Review Score</p>
                            </div>
                            <div className="bg-[#1f1812] p-6 rounded-xl border border-white/10">
                                <Shield className="text-[#EF6C00] mb-4" size={32} />
                                <h3 className="text-2xl font-bold text-white mb-2">100%</h3>
                                <p className="text-sm text-gray-400">Secure Bookings</p>
                            </div>
                            <div className="bg-[#1f1812] p-6 rounded-xl border border-white/10">
                                <Award className="text-[#EF6C00] mb-4" size={32} />
                                <h3 className="text-2xl font-bold text-white mb-2">Top 1%</h3>
                                <p className="text-sm text-gray-400">Hospitality Awards</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
