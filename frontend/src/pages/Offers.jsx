
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const Offers = () => {
    const offers = [
        {
            id: 1,
            tag: 'LIMITED TIME',
            title: 'Last Minute Monsoon Deals',
            desc: 'Escape the heat and embrace the rain. Enjoy up to 30% off on premium villa stays across Western Ghats and Kerala.',
            date: 'Valid until Aug 31, 2026',
            img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop',
            btn: 'Book Your Monsoon Retreat',
            featured: true
        },
        {
            id: 2,
            tag: 'SEASONAL',
            title: 'Early Bird Winter Bookings',
            desc: 'Plan ahead for the snow. Book your winter stay 90 days in advance and save 25% on luxury mountain suites.',
            date: 'Valid thru Dec 15, 2026',
            img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
            btn: 'Claim Offer'
        },
        {
            id: 3,
            tag: 'BANK PARTNER',
            title: 'HDFC Bank Exclusive',
            desc: 'Get an additional 10% instant discount + 5x Reward Points when you pay with HDFC Bank Credit Cards.',
            code: 'STAYHDFC10',
            img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
            btn: 'Apply Code'
        },
        {
            id: 4,
            tag: 'EXPERIENCE',
            title: 'Jaipur Package',
            desc: 'Book a 3-night stay at any Royal Heritage property and receive a complimentary 90-minute Ayurvedic spa session for two.',
            status: 'Active',
            img: '/images/jaipur.jpg',
            btn: 'Book Now'
        },
        {
            id: 5,
            tag: 'GOLD & PLATINUM',
            title: 'Members-Only Breakfast',
            desc: 'Enjoy complimentary gourmet breakfast and airport transfers on all bookings made directly through our app.',
            status: 'Permanent Offer',
            img: '/images/kerala.jpg',
            btn: 'Join Now'
        },
        {
            id: 6,
            tag: 'ROMANCE',
            title: 'Weekday Honeymoon Special',
            desc: 'Celebrate your love with a midweek getaway. 20% off room rates plus a bottle of premium wine on arrival.',
            date: 'Valid Thru Oct 31, 2026',
            img: '/images/udaipur.jpg',
            btn: 'Claim Offer'
        },
        {
            id: 7,
            tag: 'PREMIUM PARTNER',
            title: 'Amex Platinum Escapes',
            desc: 'Exclusive 15% discount for American Express Platinum Cardholders on all beachfront properties.',
            code: 'AMEXPLATI15',
            img: '/images/goa.jpg',
            btn: 'Apply Code'
        }
    ];

    return (
        <div className="bg-[#1f1812] min-h-screen pt-12 pb-24">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3">Exclusive Offers</h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Discover handpicked deals and limited-time promotions for your next luxury getaway. Experiences designed to reward our most valued guests.
                    </p>
                </div>

                {/* Categories Navbar */}
                <div className="flex gap-8 border-b border-white/10 mb-10 overflow-x-auto scrollbar-hide text-sm font-semibold">
                    <button className="pb-4 text-[#EF6C00] border-b-2 border-[#EF6C00]">All Promotions</button>
                    <button className="pb-4 text-gray-400 hover:text-gray-200 border-b-2 border-transparent">Seasonal Stays</button>
                    <button className="pb-4 text-gray-400 hover:text-gray-200 border-b-2 border-transparent">Bank & Partner Offers</button>
                    <button className="pb-4 text-gray-400 hover:text-gray-200 border-b-2 border-transparent">Member Specials</button>
                </div>

                {/* Featured Offer Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#15100B] border border-white/5 rounded-2xl overflow-hidden flex flex-col lg:flex-row mb-10"
                >
                    <div className="w-full lg:w-[60%] h-[300px] lg:h-auto relative">
                        <img src={offers[0].img} alt="Featured Offer" className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-[#EF6C00] text-white text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wider shadow-lg">
                            {offers[0].tag}
                        </div>
                    </div>
                    <div className="w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mb-4">{offers[0].title}</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">{offers[0].desc}</p>
                        <div className="flex items-center gap-2 text-[#EF6C00] text-xs font-bold uppercase tracking-wider mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                            {offers[0].date}
                        </div>
                        <button className="bg-[#EF6C00] hover:bg-[#E65100] text-white py-4 rounded-lg font-bold transition shadow-lg w-full text-center">
                            {offers[0].btn}
                        </button>
                        <p className="text-gray-500 text-[10px] text-center mt-3">*Terms and Conditions apply</p>
                    </div>
                </motion.div>

                {/* Regular Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {offers.slice(1).map((offer, i) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#15100B] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition duration-300"
                        >
                            <div className="h-56 relative">
                                <img src={offer.img} alt={offer.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#15100B] to-transparent opacity-60"></div>
                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-[#EF6C00] text-[9px] uppercase font-bold px-2 py-1 rounded tracking-wider">
                                    {offer.tag}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-3">{offer.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6">{offer.desc}</p>

                                <div className="mt-auto flex justify-between items-end">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#EF6C00] text-[10px] font-bold uppercase tracking-wider">
                                            {offer.date ? 'Valid Thru' : offer.code ? 'Promo Code' : 'Status'}
                                        </span>
                                        <span className="text-white text-sm font-semibold">
                                            {offer.date ? offer.date.split('Valid thru ')[1] || offer.date.split('Valid Thru ')[1] : offer.code || offer.status}
                                        </span>
                                    </div>
                                    <button className="bg-white hover:bg-gray-200 text-black px-5 py-2 rounded font-bold text-xs transition">
                                        {offer.btn}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="bg-[#15100B] border border-white/5 rounded-2xl p-8">
                    <h4 className="text-white font-semibold mb-6">Offer Terms & Information</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
                        <li className="flex items-start gap-2">
                            <span className="text-[#EF6C00]">•</span> All offers are subject to availability at the time of booking.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#EF6C00]">•</span> StayIndia reserves the right to modify or withdraw offers without prior notice.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#EF6C00]">•</span> Bank offers cannot be combined with seasonal or member-exclusive discounts unless specified.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#EF6C00]">•</span> Blackout dates may apply during peak holidays and festival seasons.
                        </li>
                    </ul>
                </div>

            </div>
        </div >
    );
};

export default Offers;
