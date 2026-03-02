import React from 'react';

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#111827] pt-16 pb-8 border-t border-white/5 mt-auto">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                    {/* Brand Col */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-[#EF6C00] rounded-full flex items-center justify-center rounded-bl-none transform rotate-45">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <span className="font-bold text-lg text-white tracking-wide">StayIndia</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed pr-8">
                            Curating the finest hospitality experiences across the Indian subcontinent. Luxury, heritage, and comfort redefined.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/our-hotels" className="hover:text-white transition">Our Hotels</Link></li>
                            <li><Link to="/partner-with-us" className="hover:text-white transition">Partner with Us</Link></li>
                            <li><Link to="/sustainability" className="hover:text-white transition">Sustainability</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-1">
                        <h4 className="text-white font-semibold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
                            <li><Link to="/booking-policy" className="hover:text-white transition">Booking Policy</Link></li>
                            <li><Link to="/support" className="hover:text-white transition">Contact Support</Link></li>
                            <li><Link to="/gift-vouchers" className="hover:text-white transition">Gift Vouchers</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
                        <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for exclusive offers.</p>
                        <div className="flex">
                            <input type="email" placeholder="Email" className="bg-[#1f2937] text-white px-4 py-2 rounded-l-md w-full focus:outline-none text-sm border-y border-l border-white/10" />
                            <button className="bg-[#EF6C00] hover:bg-[#E65100] px-4 py-2 rounded-r-md transition flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© 2026 StayIndia Luxury Hotels Ltd. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                        <a href="#" className="hover:text-white transition">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
