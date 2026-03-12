import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Grid, BookOpen, User, MapPin, ArrowRight } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';


const Collections = () => {
    const [activeTab, setActiveTab] = useState('All Collections');

    const tabs = ['All Collections', 'Heritage', 'Nature', 'Urban', 'Beach'];

    const collections = [
        {
            id: 1,
            tag: 'HERITAGE • 12 Featured Properties',
            title: 'Heritage Palaces of Rajasthan',
            desc: 'Experience the grandeur of royalty. Live in historic fort-palaces with ornate carvings, sprawling courtyards, and world-class hospitality in the heart of the desert.',
            loc: 'Jaipur, Udaipur, Jodhpur',
            img: '/jaipur.jpg',
            type: 'left'
        },
        {
            id: 2,
            tag: 'NATURE • 8 Featured Properties',
            title: 'Backwater Retreats of Kerala',
            desc: "Surrender to the slow pace of life in God's Own Country. Stay in luxury houseboats or boutique resorts nestled along serene emerald waterways and coconut groves.",
            loc: 'Alleppey, Kumarakom',
            img: '/kerala.jpg',
            type: 'right'
        },
        {
            id: 3,
            tag: 'URBAN • 15 Featured Properties',
            title: 'Modern Urban Escapes',
            desc: "Sleek design meets city convenience. Discover the finest contemporary hotels in India's bustling metropolises, offering rooftop infinity pools and avant-garde dining.",
            loc: 'Mumbai, Bangalore, Delhi',
            img: '/udaipur1.jpg',
            type: 'left'
        },
        {
            id: 4,
            tag: 'BEACH • 10 Featured Properties',
            title: 'Luxury Beach Resorts',
            desc: 'Golden sands and turquoise waters. From private villas in Goa to secluded eco-resorts in the Andamans, find your perfect coastal sanctuary.',
            loc: 'Goa, Andaman, Gokarna',
            img: '/goa.jpg',
            type: 'right'
        }
    ];

    return (
        <div className="bg-[#1f1812] min-h-screen pt-12 pb-24">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">

                {/* Left Sidebar Menu */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="flex flex-col gap-2 mb-8">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition">
                            <Home size={20} /> <span className="text-sm font-semibold">Home</span>
                        </Link>
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#EF6C00] text-white rounded-xl shadow-[0_4px_14px_0_rgba(239,108,0,0.39)] cursor-pointer">
                            <Grid size={20} /> <span className="text-sm font-semibold">Collections</span>
                        </div>
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition">
                            <BookOpen size={20} /> <span className="text-sm font-semibold">Bookings</span>
                        </Link>
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition">
                            <User size={20} /> <span className="text-sm font-semibold">Profile</span>
                        </Link>
                    </div>

                    <div className="bg-[#15100B] border border-white/10 rounded-2xl p-6">
                        <div className="text-[#EF6C00] text-[10px] font-bold uppercase tracking-wider mb-2">Member Perks</div>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            Get 15% off on all Heritage collection bookings this month.
                        </p>
                        <button className="w-full bg-white/5 hover:bg-white/10 text-[#EF6C00] border border-[#EF6C00]/30 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition">
                            View Deals
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-2">Collections</h1>
                    <p className="text-gray-400 mb-8 max-w-2xl">
                        Handpicked escapes tailored for your next Indian journey.
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-white/10 mb-10 overflow-x-auto scrollbar-hide">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'text-[#EF6C00] border-[#EF6C00]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* List of Collections */}
                    <div className="flex flex-col gap-8">
                        {collections.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className={`bg-[#15100B] border border-white/5 rounded-2xl overflow-hidden flex flex-col ${item.type === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} group`}
                            >
                                {/* Image Section */}
                                <div className="w-full md:w-[45%] h-[300px] md:h-auto relative overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center border-l border-white/5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-[#EF6C00] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                            {item.tag.split('•')[0].trim()}
                                        </span>
                                        <span className="text-gray-500 text-xs font-medium">
                                            {item.tag.split('•')[1].trim()}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#EF6C00] transition-colors">{item.title}</h2>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                                        {item.desc}
                                    </p>

                                    <div className="flex items-center gap-2 text-[#EF6C00] text-sm font-medium mb-8">
                                        <MapPin size={16} />
                                        <span>{item.loc}</span>
                                    </div>

                                    <div>
                                        <Link to="/flats" className="inline-flex items-center gap-2 bg-[#EF6C00] hover:bg-[#E65100] text-white px-6 py-3 rounded-full text-sm font-bold transition shadow-lg group-hover:-translate-y-1">
                                            Explore Collection <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Collections;
