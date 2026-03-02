import React from 'react';
import { ShieldAlert, Clock, CreditCard, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const BookingPolicy = () => {
    return (
        <div className="bg-[#2a2119] min-h-screen text-[#FDFBF7] font-sans selection:bg-[#EF6C00]">

            {/* Header */}
            <div className="bg-[#1f1812] pt-32 pb-16 border-b border-[#3b2d22]">
                <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Booking & Cancellation Policy</h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Transparent guidelines to ensure your luxury experience with StayIndia is seamless from reservation to checkout.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Section 1 */}
                <section className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#EF6C00]/20 p-3 rounded-lg text-[#EF6C00]"><Clock size={24} /></div>
                        <h2 className="text-2xl font-bold text-white">Check-in & Check-out</h2>
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
                        <p>Our standard timings are designed to allow rigorous preparation of our premium suites between stays:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong className="text-white">Check-in time:</strong> 2:00 PM (14:00 hours) IST</li>
                            <li><strong className="text-white">Check-out time:</strong> 11:00 AM (11:00 hours) IST</li>
                        </ul>
                        <p className="bg-[#1f1812] border border-[#3b2d22] p-4 rounded-xl text-sm italic mt-4">
                            *Early check-in and late check-out are subject to availability. Platinum members receive guaranteed 4PM late check-out.
                        </p>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#EF6C00]/20 p-3 rounded-lg text-[#EF6C00]"><CreditCard size={24} /></div>
                        <h2 className="text-2xl font-bold text-white">Payment Terms</h2>
                    </div>
                    <div className="space-y-6 text-gray-300">
                        <p>To confirm a reservation at any StayIndia property, valid payment details must be provided at the time of booking.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#1f1812] border border-[#3b2d22] p-6 rounded-xl">
                                <h3 className="font-bold text-white mb-2">Standard Rates</h3>
                                <p className="text-sm text-gray-400">A 50% deposit is charged at the time of booking. The remaining balance will be charged 7 days prior to arrival.</p>
                            </div>
                            <div className="bg-[#1f1812] border border-[#3b2d22] p-6 rounded-xl">
                                <h3 className="font-bold text-white mb-2">Non-Refundable Rates</h3>
                                <p className="text-sm text-gray-400">Full prepayment is required at the time of booking. This rate offers the maximum discount but cannot be refunded.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#EF6C00]/20 p-3 rounded-lg text-[#EF6C00]"><ShieldAlert size={24} /></div>
                        <h2 className="text-2xl font-bold text-white">Cancellation & Refunds</h2>
                    </div>

                    <div className="bg-[#15100B] border border-red-900/30 rounded-2xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-red-900/20 to-transparent p-6 border-b border-[#3b2d22]">
                            <h3 className="font-bold text-white text-lg flex items-center gap-2"><AlertCircle size={18} className="text-red-500" /> Standard Stay Policy</h3>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm border-b border-[#3b2d22] pb-4">
                                    <span className="text-gray-300">Up to 14 days before arrival</span>
                                    <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded">100% Refund</span>
                                </li>
                                <li className="flex justify-between items-center text-sm border-b border-[#3b2d22] pb-4">
                                    <span className="text-gray-300">13 to 7 days before arrival</span>
                                    <span className="text-yellow-500 font-bold bg-yellow-500/10 px-3 py-1 rounded">50% Refund</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-gray-300">Less than 7 days / No-show</span>
                                    <span className="text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded">No Refund</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                        Refunds for valid cancellations will be processed to the original form of payment within 5-7 business days.
                        In cases of force majeure (such as pandemic lockdowns or natural disasters), StayIndia will provide a full credit voucher valid for 18 months, regardless of the rate booked.
                    </p>
                </section>

                <hr className="border-[#3b2d22] mb-12" />

                <div className="text-center">
                    <p className="text-gray-400 mb-4">Have specific questions regarding a current booking?</p>
                    <a href="/support" className="text-[#EF6C00] font-bold hover:underline">Contact our Reservations Team</a>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default BookingPolicy;
