import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Lock, MapPin, CreditCard, Smartphone, ShieldCheck, HelpCircle } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

// Note: Using a dummy ID or mock data for demonstration if no :id is provided or fetch fails.
const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthStore();

    const [flat, setFlat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please log in to proceed with checkout.");
            navigate('/login');
            return;
        }

        const fetchFlatDetails = async () => {
            try {
                // Try fetching real flat, otherwise use mock
                const res = await axiosClient.get(`/flats/${id}`);
                setFlat(res.data.data);
            } catch {
                // Mock fallback for UI testing
                setFlat({
                    _id: id || 'mock-id',
                    title: 'The Raj Palace',
                    tower: { name: 'Jaipur, Rajasthan' },
                    rent: 15000,
                    bhk: 'Premier Heritage Suite',
                    images: ['https://images.unsplash.com/photo-1582647509711-c8aa8a8b5476?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
                });
            } finally {
                setLoading(false);
            }
        };

        fetchFlatDetails();
    }, [id, isAuthenticated, navigate]);

    const handleConfirmBooking = async () => {
        setIsProcessing(true);
        try {
            // Simulated payment delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Hit backend
            await axiosClient.post('/bookings', {
                flat: flat._id,
                moveInDate: new Date().toISOString(), // In real app, pulled from state/url params
                notes: `Guests: 2. Name: ${firstName} ${lastName}. Phone: ${phone}. Payment: ${paymentMethod}`
            });

            toast.success('Payment successful! Booking confirmed.');
            navigate('/dashboard');
        } catch {
            toast.error('Payment failed or booking error.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading || !flat) return <div className="h-screen bg-[#15100B] flex items-center justify-center text-[#EF6C00]">Preparing Checkout...</div>;

    // Pricing Math
    const nights = 3;
    const roomRateTotal = flat.rent * nights;
    const discount = roomRateTotal * 0.1; // 10% discount mockup
    const gstRate = 0.18;
    const gstTotal = (roomRateTotal - discount) * gstRate;
    const serviceFee = 499;
    const totalAmount = roomRateTotal - discount + gstTotal + serviceFee;

    return (
        <div className="bg-[#15100B] min-h-screen text-[#FDFBF7] py-12 font-sans selection:bg-[#EF6C00] selection:text-white">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-8">

                {/* Process Header */}
                <div className="mb-10 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-gray-500">
                    <span className="text-gray-400">Destinations</span> <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-400">Hotels</span> <ChevronRight className="w-4 h-4" />
                    <span className="text-[#EF6C00]">Review Stay</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Column - Forms */}
                    <div className="flex-1 space-y-12">

                        {/* 1. Review Your Stay */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#EF6C00] text-[#1a140f] flex items-center justify-center text-sm">1</span>
                                Review your stay
                            </h2>
                            <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                                <div className="absolute top-4 right-4 bg-[#EF6C00]/20 text-[#EF6C00] border border-[#EF6C00]/30 px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase">Heritage</div>
                                <img src={flat.images[0]} alt={flat.title} className="w-40 h-32 object-cover rounded-xl border border-[#3b2d22]" />
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-[#EF6C00]">{flat.title}</h3>
                                    <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 mb-6"><MapPin className="w-4 h-4" /> {flat.tower?.name}</p>

                                    <div className="grid grid-cols-3 gap-4 border-t border-[#3b2d22] pt-4">
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Dates</div>
                                            <div className="font-semibold text-sm">Oct 12 - Oct 15, 2024</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Guests</div>
                                            <div className="font-semibold text-sm">2 Adults, 1 Room</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Room Type</div>
                                            <div className="font-semibold text-sm truncate">{flat.bhk}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. Guest Details */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#EF6C00] text-[#1a140f] flex items-center justify-center text-sm">2</span>
                                Guest Details
                            </h2>
                            <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-8">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 mb-2">First Name</label>
                                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] transition-colors" placeholder="Arjun" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-400 mb-2">Last Name</label>
                                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] transition-colors" placeholder="Sharma" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Email Address</label>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-3 px-4 focus:outline-none focus:border-[#EF6C00] transition-colors" placeholder="arjun.sharma@example.com" />
                                        <p className="text-[10px] text-gray-500 mt-2">We'll send your booking confirmation to this address.</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2">Phone Number</label>
                                        <div className="flex border border-[#3b2d22] rounded-lg overflow-hidden focus-within:border-[#EF6C00] transition-colors">
                                            <span className="bg-[#1f1812] border-r border-[#3b2d22] text-gray-400 flex items-center px-4">+91</span>
                                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#15100B] text-[#FDFBF7] py-3 px-4 focus:outline-none" placeholder="9876543210" />
                                        </div>
                                    </div>
                                    <div className="flex items-center pt-2">
                                        <input type="checkbox" id="marketing" className="w-4 h-4 rounded border-[#3b2d22] bg-[#15100B] text-[#EF6C00] focus:ring-[#EF6C00] focus:ring-offset-[#1f1812]" />
                                        <label htmlFor="marketing" className="ml-3 text-xs text-gray-400">Receive exclusive travel deals and updates from StayIndia via WhatsApp and Email.</label>
                                    </div>
                                </form>
                            </div>
                        </section>

                        {/* 3. Payment Method */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#EF6C00] text-[#1a140f] flex items-center justify-center text-sm">3</span>
                                Payment Method
                            </h2>
                            <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl overflow-hidden">

                                {/* Card Tab */}
                                <div
                                    className={`p-6 border-b border-[#3b2d22] cursor-pointer transition-colors ${paymentMethod === 'card' ? 'bg-[#2a2119]' : 'hover:bg-[#15100B]'}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <div className="flex items-center justify-between pointer-events-none">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#EF6C00]' : 'border-gray-500'}`}>
                                                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#EF6C00]" />}
                                            </div>
                                            <div>
                                                <div className="font-bold">Credit / Debit Card</div>
                                                <div className="text-xs text-gray-500">Visa, Mastercard, RuPay, Amex</div>
                                            </div>
                                        </div>
                                        <CreditCard className="w-6 h-6 text-gray-500" />
                                    </div>
                                </div>

                                {/* UPI Tab */}
                                <div
                                    className={`p-6 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'bg-[#2a2119]' : 'hover:bg-[#15100B]'}`}
                                    onClick={() => setPaymentMethod('upi')}
                                >
                                    <div className="flex items-center justify-between pointer-events-none">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#EF6C00]' : 'border-gray-500'}`}>
                                                {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-[#EF6C00]" />}
                                            </div>
                                            <div>
                                                <div className="font-bold">UPI Payment</div>
                                                <div className="text-xs text-gray-500">GPay, PhonePe, Paytm</div>
                                            </div>
                                        </div>
                                        <Smartphone className="w-6 h-6 text-gray-500" />
                                    </div>
                                </div>

                            </div>
                        </section>

                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="w-full lg:w-96">
                        <div className="sticky top-24">

                            <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-8 mb-6 shadow-2xl">
                                <h3 className="text-xl font-bold mb-6">Price Details</h3>

                                <div className="space-y-4 mb-6 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Premier Suite x 3 Nights</span>
                                        <span className="font-semibold">₹{roomRateTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-green-500">
                                        <span>Total Discount</span>
                                        <span className="font-semibold">- ₹{discount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">GST (18%)</span>
                                        <span className="font-semibold">₹{gstTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Service Fee</span>
                                        <span className="font-semibold">₹{serviceFee.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="border-t border-[#3b2d22] pt-6 mb-8 flex justify-between items-end">
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Total Amount</div>
                                        <div className="text-[9px] text-gray-600">Inclusive of all Taxes</div>
                                    </div>
                                    <div className="text-3xl font-bold text-[#EF6C00]">
                                        ₹{totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmBooking}
                                    disabled={isProcessing}
                                    className="w-full bg-[#EF6C00] text-[#1a140f] font-bold py-4 px-6 rounded-xl hover:bg-[#fb8c00] transition-colors shadow-lg shadow-[#EF6C00]/20 flex justify-center items-center gap-2 mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <div className="w-5 h-5 border-2 border-[#1a140f] border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <><Lock className="w-4 h-4" /> Confirm & Pay</>
                                    )}
                                </button>

                                <div className="text-center text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
                                    100% Secure Checkout
                                </div>
                            </div>

                            {/* Free Cancellation Banner */}
                            <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-5 mb-6 flex gap-4">
                                <ShieldCheck className="w-6 h-6 text-[#EF6C00] flex-shrink-0" />
                                <div>
                                    <div className="font-bold text-sm mb-1">Free Cancellation</div>
                                    <div className="text-xs text-gray-400 leading-relaxed">Cancel up to 24 hours before check-in for a full refund.</div>
                                </div>
                            </div>

                            {/* Coupon Code Context */}
                            <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-5">
                                <div className="text-sm font-bold text-center mb-4 text-[#FDFBF7]">Have a coupon code?</div>
                                <div className="flex gap-2">
                                    <input type="text" className="flex-1 bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#EF6C00]" placeholder="CODE10" />
                                    <button className="text-[#EF6C00] font-bold px-4 hover:underline text-sm">Apply</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Footer simple layout matching mockup */}
                <div className="mt-24 pt-10 border-t border-[#3b2d22] grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex flex-col gap-4">
                            <span className="font-bold text-xl flex items-center gap-2 text-[#EF6C00]"><MapPin /> STAYINDIA</span>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">Discover the essence of Indian hospitality across curated heritage and modern properties.</p>
                        </div>
                    </div>
                    <div>
                        <ul className="space-y-3 text-gray-400 text-xs">
                            <li className="font-bold text-[#FDFBF7] mb-4 text-sm">Support</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Cancellation Options</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Trust & Safety</li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-3 text-gray-400 text-xs">
                            <li className="font-bold text-[#FDFBF7] mb-4 text-sm">Company</li>
                            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-3 text-gray-400 text-xs text-right md:text-left">
                            <li className="font-bold text-[#FDFBF7] mb-4 text-sm">Legal</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Refund Policy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
