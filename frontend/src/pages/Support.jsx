import React, { useState } from 'react';
import { Search, MessageSquare, PhoneCall, Mail, BookOpen, CreditCard, XCircle, User, ChevronRight } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';

const Support = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [openFaq, setOpenFaq] = useState(null);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [ticketData, setTicketData] = useState({ subject: '', message: '' });

    const faqs = [
        { id: 1, category: 'Booking', q: 'How to apply luxury membership points for upgrades?', a: 'You can apply your membership points during checkout simply by checking the "Redeem Points" box before confirming payment.' },
        { id: 2, category: 'Cancellation', q: 'Standard vs. Premium cancellation policies', a: 'Premium allows cancellation up to 24h prior to check-in for a full refund. Standard requires 7 days notice.' },
        { id: 3, category: 'Booking', q: 'Adding special requests to your stay', a: 'After booking, navigate to your Dashboard -> Bookings and click "Add Special Request" for dietary needs or early check-in.' },
        { id: 4, category: 'Payments', q: 'Managing corporate travel bookings', a: 'Please contact our B2B team at corporate@stayindia.com to set up a GST-enabled invoicing profile.' },
        { id: 5, category: 'Account', q: 'How do I reset my password?', a: 'Click the "Forgot Password" link on the login page to receive a secure reset link.' },
    ];

    const filteredFaqs = faqs.filter(faq =>
        (activeCategory === 'All' || faq.category === activeCategory) &&
        (searchQuery === '' || faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleTicketSubmit = (e) => {
        e.preventDefault();
        // In a real app, send this to the backend
        alert('Ticket submitted successfully! Our concierge team will reply within 12-24 hours.');
        setTicketData({ subject: '', message: '' });
        setIsTicketModalOpen(false);
    };

    return (
        <div className="bg-[#1f1812] min-h-screen pt-12 pb-24">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header content */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Help & Support</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        How can we assist you with your luxury experience today? Search our knowledge base or contact our concierge team.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-16 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search for bookings, payments, or stay policies..."
                        className="w-full bg-[#15100B] border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#EF6C00] shadow-xl placeholder-gray-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <motion.div whileHover={{ y: -5 }} className="bg-[#15100B] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-[#EF6C00]/10 flex items-center justify-center text-[#EF6C00] mb-4">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                        <p className="text-gray-500 text-sm mb-6">Average response time: 2 mins</p>
                        <button className="w-full bg-[#EF6C00] hover:bg-[#E65100] text-white py-3 rounded-lg font-bold transition">Start Chat</button>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="bg-[#15100B] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-[#EF6C00]/10 flex items-center justify-center text-[#EF6C00] mb-4">
                            <PhoneCall size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                        <p className="text-gray-500 text-sm mb-6">Available 24/7 for Priority Members</p>
                        <button className="w-full bg-transparent hover:bg-white/5 border border-[#EF6C00] text-[#EF6C00] py-3 rounded-lg font-bold transition">Call Concierge</button>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="bg-[#15100B] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-[#EF6C00]/10 flex items-center justify-center text-[#EF6C00] mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                        <p className="text-gray-500 text-sm mb-6">Responses within 12-24 hours</p>
                        <button
                            onClick={() => setIsTicketModalOpen(true)}
                            className="w-full bg-transparent hover:bg-white/5 border border-[#EF6C00] text-[#EF6C00] py-3 rounded-lg font-bold transition">
                            Submit Ticket
                        </button>
                    </motion.div>
                </div>


                {/* Browse by Topic */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Browse by Topic</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <button
                            onClick={() => setActiveCategory('All')}
                            className={`flex items-center justify-center gap-3 border py-4 rounded-xl font-medium transition cursor-pointer group ${activeCategory === 'All' ? 'bg-[#EF6C00]/10 border-[#EF6C00] text-[#EF6C00]' : 'bg-[#15100B] hover:bg-white/5 border-white/5 text-white'}`}>
                            All Topics
                        </button>
                        <button
                            onClick={() => setActiveCategory('Booking')}
                            className={`flex items-center justify-center gap-3 border py-4 rounded-xl font-medium transition cursor-pointer group ${activeCategory === 'Booking' ? 'bg-[#EF6C00]/10 border-[#EF6C00] text-[#EF6C00]' : 'bg-[#15100B] hover:bg-white/5 border-white/5 text-white'}`}>
                            <BookOpen size={18} className={`${activeCategory === 'Booking' ? 'text-[#EF6C00]' : 'text-[#EF6C00] group-hover:scale-110'} transition-transform`} /> Booking
                        </button>
                        <button
                            onClick={() => setActiveCategory('Payments')}
                            className={`flex items-center justify-center gap-3 border py-4 rounded-xl font-medium transition cursor-pointer group ${activeCategory === 'Payments' ? 'bg-[#EF6C00]/10 border-[#EF6C00] text-[#EF6C00]' : 'bg-[#15100B] hover:bg-white/5 border-white/5 text-white'}`}>
                            <CreditCard size={18} className={`${activeCategory === 'Payments' ? 'text-[#EF6C00]' : 'text-[#EF6C00] group-hover:scale-110'} transition-transform`} /> Payments
                        </button>
                        <button
                            onClick={() => setActiveCategory('Cancellation')}
                            className={`flex items-center justify-center gap-3 border py-4 rounded-xl font-medium transition cursor-pointer group ${activeCategory === 'Cancellation' ? 'bg-[#EF6C00]/10 border-[#EF6C00] text-[#EF6C00]' : 'bg-[#15100B] hover:bg-white/5 border-white/5 text-white'}`}>
                            <XCircle size={18} className={`${activeCategory === 'Cancellation' ? 'text-[#EF6C00]' : 'text-[#EF6C00] group-hover:scale-110'} transition-transform`} /> Cancellation
                        </button>
                        <button
                            onClick={() => setActiveCategory('Account')}
                            className={`flex items-center justify-center gap-3 border py-4 rounded-xl font-medium transition cursor-pointer group ${activeCategory === 'Account' ? 'bg-[#EF6C00]/10 border-[#EF6C00] text-[#EF6C00]' : 'bg-[#15100B] hover:bg-white/5 border-white/5 text-white'}`}>
                            <User size={18} className={`${activeCategory === 'Account' ? 'text-[#EF6C00]' : 'text-[#EF6C00] group-hover:scale-110'} transition-transform`} /> Account
                        </button>
                    </div>
                </div>

                {/* Bottom Split Section */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Top Helpful Articles / FAQs */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-6">{activeCategory === 'All' ? 'Frequently Asked Questions' : `${activeCategory} FAQs`}</h2>

                        {filteredFaqs.length === 0 ? (
                            <div className="bg-[#15100B] border border-white/5 rounded-xl p-8 text-center text-gray-500">
                                No articles found matching your search. Try adjusting your query or submit a ticket.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {filteredFaqs.map((faq) => (
                                    <div
                                        key={faq.id}
                                        className="bg-[#15100B] border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
                                    >
                                        <div
                                            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                            className="p-6 cursor-pointer flex items-center justify-between group hover:bg-white/5"
                                        >
                                            <h4 className={`font-bold transition-colors ${openFaq === faq.id ? 'text-[#EF6C00]' : 'text-white group-hover:text-[#EF6C00]'}`}>
                                                {faq.q}
                                            </h4>
                                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-[#EF6C00] group-hover:bg-[#EF6C00]/10 transition">
                                                <ChevronRight size={18} className={`transition-transform duration-300 ${openFaq === faq.id ? 'rotate-90' : ''}`} />
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {openFaq === faq.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4"
                                                >
                                                    {faq.a}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
                        <div className="bg-[#15100B] border border-white/5 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4">Trending Topics</h3>
                            <ul className="space-y-4">
                                {['COVID-19 Health & Safety', 'Pet-Friendly Luxury Villas', 'International Payment Methods', 'Concierge Services Explained', 'StayIndia Mobile App Guide'].map((topic, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400 hover:text-white cursor-pointer transition">
                                        <span className="text-[#EF6C00]">•</span> {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#EF6C00] rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <User size={80} />
                            </div>
                            <div className="relative z-10">
                                <span className="bg-white text-[#EF6C00] text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wider mb-4 inline-block">Member Exclusive</span>
                                <p className="text-white text-sm font-semibold mb-6">Platinum members get a dedicated 24/7 personal travel assistant.</p>
                                <button className="text-white text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                                    Upgrade Now <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Ticket Submission Modal */}
            <AnimatePresence>
                {isTicketModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1a1614] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#15100B]">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Mail className="text-[#EF6C00]" size={20} /> Submit a Ticket
                                </h3>
                                <button
                                    onClick={() => setIsTicketModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleTicketSubmit} className="p-6 flex flex-col gap-4">
                                <p className="text-gray-400 text-sm mb-2">Our concierge team generally replies to high-priority tickets within 2 hours.</p>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={ticketData.subject}
                                        onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                                        className="w-full bg-[#110D09] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#EF6C00] transition"
                                        placeholder="e.g. Booking Cancellation #12345"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={ticketData.message}
                                        onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                                        className="w-full bg-[#110D09] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#EF6C00] transition resize-none"
                                        placeholder="Please describe your issue in detail..."
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsTicketModalOpen(false)}
                                        className="px-6 py-3 rounded-lg text-gray-300 hover:bg-white/5 font-medium transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#EF6C00] hover:bg-[#E65100] text-white px-8 py-3 rounded-lg font-bold transition shadow-lg"
                                    >
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Support;
