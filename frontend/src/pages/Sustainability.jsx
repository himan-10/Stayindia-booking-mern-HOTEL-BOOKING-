import React from 'react';
import { Leaf, Droplets, Sun, Recycle } from 'lucide-react';
import Footer from '../components/Footer';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const Sustainability = () => {
    return (
        <div className="bg-[#2a2119] min-h-screen text-white font-sans selection:bg-[#EF6C00] selection:text-white">

            {/* Hero */}
            <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Nature" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#2a2119]/80 backdrop-blur-sm"></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center max-w-3xl px-4"
                >
                    <Leaf className="w-16 h-16 text-[#4ADE80] mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Sustainable Tourism</h1>
                    <p className="text-xl text-gray-200">
                        Preserving India's heritage and natural beauty for generations to come.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Commitment to Earth</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            At StayIndia, we recognize that our operations have an impact on the environment and local communities. We are committed to achieving net-zero emissions by 2035 and ensuring that 100% of our partner properties adhere to strict sustainable guidelines.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            From eliminating single-use plastics in our heritage resorts to deeply integrating local sourcing of food and materials, every booking with StayIndia contributes to local conservation efforts and community empowerment.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-[#1f1812] border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-[#4ADE80]/50 transition-colors">
                            <Droplets className="text-[#4ADE80] mb-4 w-10 h-10" />
                            <h3 className="font-bold mb-2">Water Conservation</h3>
                            <p className="text-xs text-gray-500">Rainwater harvesting and smart recycling systems in 80% properties.</p>
                        </div>
                        <div className="bg-[#1f1812] border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-[#4ADE80]/50 transition-colors">
                            <Sun className="text-[#FBBF24] mb-4 w-10 h-10" />
                            <h3 className="font-bold mb-2">Solar Energy</h3>
                            <p className="text-xs text-gray-500">Over 35% of our remote resorts run entirely on solar power grids.</p>
                        </div>
                        <div className="bg-[#1f1812] border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-[#4ADE80]/50 transition-colors">
                            <Recycle className="text-[#4ADE80] mb-4 w-10 h-10" />
                            <h3 className="font-bold mb-2">Zero Plastic</h3>
                            <p className="text-xs text-gray-500">Glass bottles and biodegradable alternatives across all room amenities.</p>
                        </div>
                        <div className="bg-[#1f1812] border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-[#4ADE80]/50 transition-colors">
                            <Leaf className="text-[#4ADE80] mb-4 w-10 h-10" />
                            <h3 className="font-bold mb-2">Local Sourcing</h3>
                            <p className="text-xs text-gray-500">Farm-to-table dining experiences supporting local agriculture.</p>
                        </div>
                    </div>
                </div>

                {/* Eco-Friendly Stays Banner */}
                <div className="bg-gradient-to-r from-[#1f1812] to-[#15100B] border border-[#4ADE80]/20 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute -left-20 -top-20 opacity-5">
                        <Leaf className="w-96 h-96" />
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Explore Our Eco-Friendly Collection</h2>
                        <p className="text-gray-400 mb-8">
                            Discover stays that give back to the planet. Find eco-resorts nestled in nature that operate with minimal carbon footprint.
                        </p>
                        <button className="bg-[#4ADE80] text-[#1a140f] font-bold px-8 py-3 rounded-xl hover:bg-[#22c55e] transition">
                            View Eco-Stays
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Sustainability;
