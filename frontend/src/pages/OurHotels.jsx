import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

import hostelData from '../data/hostels.json';

const OurHotels = () => {
    const locations = [
        { name: 'Rajasthan', count: 120, img: 'https://images.unsplash.com/photo-1599661559684-297bc01b44d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { name: 'Kerala', count: 85, img: 'https://images.unsplash.com/photo-1599661559684-297bc01b44d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { name: 'Goa', count: 210, img: 'https://images.unsplash.com/photo-1599661559684-297bc01b44d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { name: 'Himachal', count: 95, img: 'https://images.unsplash.com/photo-1599661559684-297bc01b44d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { name: 'Maharashtra', count: 150, img: 'https://images.unsplash.com/photo-1599661559684-297bc01b44d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { name: 'Uttarakhand', count: 70, img: 'https://images.unsplash.com/photo-1599661559684-297bc01b44d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
    ];

    // Get a sample of featured properties from the JSON
    const featuredProperties = hostelData ? hostelData.slice(0, 12) : [];

    return (
        <div className="bg-[#2a2119] min-h-screen text-white font-sans selection:bg-[#EF6C00] selection:text-white">
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Hotels & Resorts</h1>
                    <p className="text-gray-300 text-lg">
                        Explore our extensive portfolio of over 1000 properties across India. Whether you seek the tranquility of the mountains or the vibrancy of the city, we have a perfect stay waiting for you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {locations.map((loc, idx) => (
                        <motion.div
                            key={loc.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer"
                        >
                            <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">{loc.name}</h3>
                                    <p className="text-sm text-gray-300 flex items-center gap-1"><MapPin size={14} /> {loc.count}+ Properties</p>
                                </div>
                                <div className="bg-[#EF6C00] p-2 rounded-full opacity-0 group-hover:opacity-100 transition translate-y-4 group-hover:translate-y-0">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Properties Section */}
                {featuredProperties.length > 0 && (
                    <div className="mb-20">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
                                <p className="text-gray-400">Discover our highest-rated stays handpicked for you.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {featuredProperties.map((property, idx) => (
                                <motion.div
                                    key={`${property.name}-${idx}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-[#1a1614] border border-white/5 rounded-2xl overflow-hidden hover:border-[#EF6C00]/30 transition group cursor-pointer"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={property.image}
                                            alt={property.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-lg">
                                            <span className="text-[#EF6C00]">★</span> {property.rating}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col h-[200px]">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-white line-clamp-1 flex-1 pr-2">{property.name}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4 flex items-center gap-1">
                                            <MapPin size={14} className="text-[#EF6C00]" /> {property.city}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4 h-14 overflow-hidden">
                                            {property.amenities.map((amenity, i) => (
                                                <span key={i} className="text-[10px] uppercase font-bold tracking-wider bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/10">
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto flex justify-between items-end pt-4 border-t border-white/5">
                                            <div>
                                                <span className="text-xs text-gray-500 block">Starts from</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-[#EF6C00] font-bold text-lg">₹{property.price}</span>
                                                    <span className="text-xs text-gray-500">/night</span>
                                                </div>
                                            </div>
                                            <div className="text-white bg-[#EF6C00] hover:bg-[#E65100] px-4 py-2 rounded-lg transition text-sm font-semibold flex items-center gap-2">
                                                Book <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center">
                    <Link to="/flats" className="inline-flex items-center gap-2 bg-[#EF6C00] hover:bg-[#E65100] text-white px-8 py-4 rounded-xl font-bold transition shadow-lg hover:-translate-y-1">
                        View All Destinations <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OurHotels;
