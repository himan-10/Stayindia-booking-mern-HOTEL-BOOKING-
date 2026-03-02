import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';
import Footer from '../components/Footer';

const FAQs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            category: 'Booking & Reservations',
            questions: [
                {
                    q: 'How do I modify or cancel my reservation?',
                    a: 'You can modify or cancel your booking through the "My Bookings" section in your Dashboard up to 48 hours before your check-in date without penalty. For late cancellations, please review our Booking Policy.'
                },
                {
                    q: 'Can I request early check-in or late check-out?',
                    a: 'Early check-in and late check-out are subject to availability. You can request these services during the booking process or by contacting your dedicated property concierge 24 hours prior to arrival.'
                },
                {
                    q: 'Do you require a deposit at booking?',
                    a: 'Yes, a 50% deposit is required to confirm your reservation. The remaining balance can be settled 7 days prior to arrival or at the property depending on your membership tier.'
                }
            ]
        },
        {
            category: 'Stay Experience & Amenities',
            questions: [
                {
                    q: 'Are your heritage properties accessible for guests with disabilities?',
                    a: 'While many of our historical palaces have architectural limitations, we have specially retrofitted ground-floor premium suites in 80% of our properties to ensure accessibility. Please inform us of your needs during booking.'
                },
                {
                    q: 'Do you arrange airport transfers?',
                    a: 'Absolutely. Complimentary luxury airport transfers (Mercedes Benz E-Class or equivalent) are included for all Platinum members and guests booking Presidential Suites.'
                },
                {
                    q: 'Are pets allowed at StayIndia properties?',
                    a: 'Select properties in our Nature and Beach collections are pet-friendly. Heritage palaces generally do not permit pets to preserve historical artifacts. Please look for the "Pet-Friendly" tag when searching.'
                }
            ]
        },
        {
            category: 'Memberships & Rewards',
            questions: [
                {
                    q: 'How do I earn StayIndia Loyalty Points?',
                    a: 'Points are earned on every eligible booking made directly through our website or app. Gold members earn 10 points per 1,000 INR spent, while Platinum members earn 15 points.'
                },
                {
                    q: 'Do loyalty points expire?',
                    a: 'Points remain valid as long as you maintain active account status (at least one booking every 24 months). If no activity occurs, points expire on the 25th month.'
                }
            ]
        }
    ];

    return (
        <div className="bg-[#2a2119] min-h-screen text-[#FDFBF7] font-sans selection:bg-[#EF6C00]">
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1000px] mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-[#EF6C00]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#EF6C00]"
                    >
                        <HelpCircle size={32} />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                        Find answers to common questions about your luxury stay, memberships, and policies.
                    </p>

                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Start typing your question..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] py-4 pl-12 pr-4 rounded-xl focus:outline-none focus:border-[#EF6C00] shadow-xl"
                        />
                    </div>
                </div>

                <div className="space-y-12">
                    {faqs.map((group, groupIdx) => (
                        <div key={groupIdx}>
                            <h2 className="text-2xl font-bold mb-6 text-[#EF6C00] border-b border-[#3b2d22] pb-4">{group.category}</h2>
                            <div className="space-y-4">
                                {group.questions.map((faq, faqIdx) => {
                                    const globalIndex = groupIdx * 100 + faqIdx; // simple unique key generator
                                    const isOpen = openIndex === globalIndex;

                                    if (searchQuery && !faq.q.toLowerCase().includes(searchQuery.toLowerCase()) && !faq.a.toLowerCase().includes(searchQuery.toLowerCase())) {
                                        return null;
                                    }

                                    return (
                                        <div
                                            key={faqIdx}
                                            className="bg-[#1f1812] border border-[#3b2d22] rounded-xl overflow-hidden transition-colors"
                                        >
                                            <button
                                                className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-[#15100B] transition"
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                            >
                                                <span className="font-semibold pr-8 text-lg">{faq.q}</span>
                                                <div className="flex-shrink-0 text-[#EF6C00]">
                                                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-gradient-to-r from-[#1f1812] to-[#15100B] p-10 rounded-2xl border border-[#3b2d22] text-center">
                    <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">Our dedicated luxury concierge team is available 24/7 to assist you with any custom requests or inquiries.</p>
                    <a href="/support" className="inline-block bg-[#EF6C00] hover:bg-[#fb8c00] text-[#15100B] font-bold px-8 py-3 rounded-lg transition-colors">
                        Contact Support
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FAQs;
