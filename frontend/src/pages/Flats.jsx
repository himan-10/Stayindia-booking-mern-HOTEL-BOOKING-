import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Map, Grid, List, ChevronRight, MapPin } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

import hostelData from '../data/hostels.json';
import Footer from '../components/Footer';

const Flats = () => {
    // Basic States
    const [priceRange, setPriceRange] = useState(5000); // Max Price filter
    const [selectedRegion, setSelectedRegion] = useState('All Locations');
    const [sortBy, setSortBy] = useState('popularity'); // popularity | priceAsc | priceDesc | ratingDesc

    // Multi-select amenity filters
    const [amenities, setAmenities] = useState({
        WiFi: false,
        AC: false,
        Cafe: false,
        "Bonfire Area": false
    });

    const toggleAmenity = (key) => setAmenities(prev => ({ ...prev, [key]: !prev[key] }));

    // Extract unique regions for dropdown
    const availableRegions = useMemo(() => {
        const regions = new Set(hostelData.map(h => h.city));
        return ['All Locations', ...Array.from(regions)];
    }, []);

    // Master filter and sort algorithm
    const filteredAndSortedStays = useMemo(() => {
        let result = [...hostelData];

        // 1. Filter by Region
        if (selectedRegion !== 'All Locations') {
            result = result.filter(h => h.city === selectedRegion);
        }

        // 2. Filter by Price Limit
        result = result.filter(h => h.price <= priceRange);

        // 3. Filter by Amenities (Must have ALL selected amenities)
        const activeAmenities = Object.keys(amenities).filter(k => amenities[k]);
        if (activeAmenities.length > 0) {
            result = result.filter(h =>
                activeAmenities.every(active => h.amenities.includes(active))
            );
        }

        // 4. Sort Data
        switch (sortBy) {
            case 'priceAsc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'ratingDesc':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'popularity':
            default:
                // Default order or random stable sorting
                break;
        }

        return result;
    }, [selectedRegion, priceRange, amenities, sortBy]);

    const handleClearAll = () => {
        setPriceRange(5000);
        setSelectedRegion('All Locations');
        setSortBy('popularity');
        setAmenities({ WiFi: false, AC: false, Cafe: false, "Bonfire Area": false });
    };

    return (
        <div className="bg-[#1f1812] min-h-screen pt-8 pb-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Breadcrumb & Title */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-[#EF6C00] mb-2 font-medium">
                        <Link to="/" className="text-gray-400 hover:text-white transition">Home</Link>
                        <span className="text-gray-600">&gt;</span>
                        <span>All Properties</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-3">Explore All Stays</h1>
                    <p className="text-gray-400 max-w-2xl">
                        Discover a curated collection of premium hotels and luxury resorts across India's most iconic destinations. From Himalayan retreats to coastal palaces.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-[#15100B] rounded-2xl p-6 border border-white/5 sticky top-28">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-semibold flex items-center gap-2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 21V14" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 10V3" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 21V12" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 8V3" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 21V16" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 12V3" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 14H7" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 8H15" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17 16H23" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Filters
                                </h3>
                                <button onClick={handleClearAll} className="text-[#EF6C00] text-xs font-bold uppercase tracking-wider hover:underline">Clear All</button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-white text-sm font-medium">Max per night</h4>
                                    <span className="text-[#EF6C00] font-bold text-sm">${priceRange.toLocaleString()}</span>
                                </div>
                                <div className="relative pt-1">
                                    <input
                                        type="range"
                                        min="500" max="5000" step="100"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#EF6C00]"
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 font-medium mt-2">
                                    <span>$500</span>
                                    <span>$5,000+</span>
                                </div>
                            </div>

                            {/* Amenities List */}
                            <div className="mb-8">
                                <h4 className="text-white text-sm font-medium mb-4">Amenities</h4>
                                <div className="space-y-3">
                                    {Object.keys(amenities).map(amenity => (
                                        <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition ${amenities[amenity] ? 'bg-[#EF6C00] border-[#EF6C00]' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                                {amenities[amenity] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                            </div>
                                            <span className="text-sm text-gray-300 select-none group-hover:text-white" onClick={() => toggleAmenity(amenity)}>{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div className="mb-8">
                                <h4 className="text-white text-sm font-medium mb-4">Location Filter</h4>
                                <div className="relative">
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                        className="appearance-none w-full bg-[#1f1812] border border-white/10 text-white py-3 px-4 pr-8 rounded-lg focus:outline-none focus:border-[#EF6C00] text-sm cursor-pointer"
                                    >
                                        {availableRegions.map(region => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1">
                        {/* Top Toolbar */}
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-3 text-sm">
                                <span className="text-gray-400">Sort by:</span>
                                <button
                                    onClick={() => setSortBy('popularity')}
                                    className={`px-3 py-1.5 rounded text-xs transition ${sortBy === 'popularity' ? 'bg-[#EF6C00] text-white font-bold uppercase' : 'text-gray-400 hover:text-white border border-transparent hover:border-white/20'}`}>
                                    Popularity
                                </button>
                                <button
                                    onClick={() => setSortBy(sortBy === 'priceAsc' ? 'priceDesc' : 'priceAsc')}
                                    className={`px-3 py-1.5 rounded text-xs transition ${sortBy.startsWith('price') ? 'bg-[#EF6C00] text-white font-bold uppercase' : 'text-gray-400 hover:text-white border border-transparent hover:border-white/20'}`}>
                                    Price {sortBy === 'priceAsc' ? '↑' : sortBy === 'priceDesc' ? '↓' : ''}
                                </button>
                                <button
                                    onClick={() => setSortBy('ratingDesc')}
                                    className={`px-3 py-1.5 rounded text-xs transition ${sortBy === 'ratingDesc' ? 'bg-[#EF6C00] text-white font-bold uppercase' : 'text-gray-400 hover:text-white border border-transparent hover:border-white/20'}`}>
                                    Rating
                                </button>
                            </div>
                            <div className="flex bg-[#15100B] rounded-lg p-1 border border-white/5">
                                <button className="p-2 text-gray-400 hover:text-white transition flex items-center gap-1 text-xs font-semibold"><Map size={16} /> MAP</button>
                                <button className="p-2 bg-[#EF6C00]/20 text-[#EF6C00] rounded transition"><Grid size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-white transition"><List size={16} /></button>
                            </div>
                        </div>

                        {/* Flats Grid */}
                        {filteredAndSortedStays.length === 0 ? (
                            <div className="bg-[#15100B] rounded-2xl p-12 text-center border border-white/5 mt-10">
                                <h3 className="text-2xl font-bold text-white mb-2">No properties found</h3>
                                <p className="text-gray-400 mb-6">Try adjusting your filters, increasing the maximum price, or selecting a different region.</p>
                                <button onClick={handleClearAll} className="bg-[#EF6C00] hover:bg-[#E65100] text-white px-6 py-3 rounded-lg font-bold transition">Clear All Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                                {filteredAndSortedStays.map((flat, index) => (
                                    <motion.div
                                        key={`${flat.name}-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-[#15100B] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#EF6C00]/30 transition duration-300"
                                    >
                                        <Link to={`/flats/details`} state={{ flat }} className="block relative cursor-pointer">
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={flat.image}
                                                    alt={flat.name}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
                                                    }}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 text-white px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase">
                                                    PREMIUM
                                                </div>
                                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#EF6C00] transition-colors">
                                                    <Heart size={18} />
                                                </div>
                                            </div>

                                            <div className="p-5 flex flex-col justify-between h-[210px]">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-lg text-white group-hover:text-[#EF6C00] transition line-clamp-1 pr-2">
                                                            {flat.name}
                                                        </h3>
                                                        <div className="flex items-center gap-1 text-[#EF6C00] text-sm font-bold flex-shrink-0 bg-[#EF6C00]/10 px-2 rounded-lg">
                                                            <Star size={14} className="fill-current" />
                                                            <span>{flat.rating}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
                                                        <MapPin size={14} className="text-[#EF6C00]" />
                                                        <span className="truncate">{flat.city}</span>
                                                    </div>

                                                    {flat.description && (
                                                        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
                                                            {flat.description}
                                                        </p>
                                                    )}

                                                    <div className="flex flex-wrap gap-2 mb-4 h-[30px] overflow-hidden">
                                                        {flat.amenities.map(tag => (
                                                            <span key={tag} className="border border-white/10 bg-white/5 text-gray-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-end mt-auto pt-4 border-t border-white/5">
                                                    <div>
                                                        <span className="text-gray-500 text-xs block mb-1">Price</span>
                                                        <span className="text-[#EF6C00] text-xl font-bold">${flat.price.toLocaleString()}</span>
                                                        <span className="text-gray-500 text-xs ml-1">/ night</span>
                                                    </div>
                                                    <div className="bg-[#EF6C00] hover:bg-[#E65100] text-white p-2.5 rounded-lg transition-colors group-hover:scale-110 duration-300">
                                                        <ChevronRight size={20} strokeWidth={3} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Flats;
