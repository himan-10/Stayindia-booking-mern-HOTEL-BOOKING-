import { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Bell, CreditCard, Edit3, Lock, Plus, X, Trash2 } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Profile = () => {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState('profile');
    const [showAddCard, setShowAddCard] = useState(false);

    // Mock saved cards
    const [savedCards, setSavedCards] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/25' },
        { id: 2, type: 'Mastercard', last4: '8888', expiry: '08/25' },
    ]);

    const handleRemoveCard = (id) => {
        setSavedCards(savedCards.filter(c => c.id !== id));
    };

    return (
        <div className="bg-[#15100B] min-h-screen text-[#FDFBF7] py-8">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row gap-8">

                {/* Left Sidebar Menu */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-4 sticky top-24">
                        <nav className="flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'profile' ? 'bg-[#EF6C00] text-[#15100B]' : 'text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119]'}`}
                            >
                                <User className="w-5 h-5" /> Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'security' ? 'bg-[#EF6C00] text-[#15100B]' : 'text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119]'}`}
                            >
                                <Shield className="w-5 h-5" /> Security
                            </button>
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'notifications' ? 'bg-[#EF6C00] text-[#15100B]' : 'text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119]'}`}
                            >
                                <Bell className="w-5 h-5" /> Notifications
                            </button>
                            <button
                                onClick={() => setActiveTab('cards')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'cards' ? 'bg-[#EF6C00] text-[#15100B]' : 'text-gray-400 hover:text-[#FDFBF7] hover:bg-[#2a2119]'}`}
                            >
                                <CreditCard className="w-5 h-5" /> Saved Cards
                            </button>
                        </nav>
                    </div>

                    {/* Member Status Card */}
                    <div className="mt-6 bg-[#1f1812] border border-[#3b2d22] rounded-2xl p-6">
                        <div className="text-[10px] font-bold text-[#EF6C00] uppercase tracking-wider mb-2">Member Status</div>
                        <h3 className="text-xl font-bold mb-4">Gold Tier</h3>
                        <div className="w-full bg-[#15100B] rounded-full h-2 mb-2">
                            <div className="bg-[#EF6C00] h-2 rounded-full w-[70%]"></div>
                        </div>
                        <div className="text-xs text-gray-500 mb-6">150 points to Platinum</div>
                        <button className="w-full py-2.5 border border-[#3b2d22] text-[#EF6C00] font-semibold text-sm rounded-lg hover:bg-[#2a2119] transition-colors">
                            Upgrade Tier
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">

                    {/* Header Banner */}
                    <div className="flex items-center gap-6 mb-12">
                        <div className="relative">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=EF6C00&color=fff&size=200`}
                                alt="Profile Avatar"
                                className="w-24 h-24 rounded-full border-4 border-[#1f1812]"
                            />
                            <button className="absolute bottom-0 right-0 bg-[#EF6C00] text-[#1a140f] p-1.5 rounded-full hover:bg-[#fb8c00] transition-colors border border-[#1f1812]">
                                <Edit3 className="w-4 h-4" />
                            </button>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{user?.name || 'Guest User'}</h1>
                            <p className="text-gray-400 text-sm mt-1">{user?.createdAt ? `Member since ${new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : 'Gold Member'}</p>
                            <div className="flex gap-3 mt-3">
                                <span className="bg-[#2a2119] text-[#EF6C00] text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">Verified Identity</span>
                                <span className="bg-[#17251a] text-green-500 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Tab Contents */}
                    <div className="space-y-12">

                        {/* Personal Information */}
                        {activeTab === 'profile' && (
                            <section>
                                <div className="flex justify-between items-end mb-6 border-b border-[#3b2d22] pb-4">
                                    <h2 className="text-xl font-bold flex items-center gap-2"><User className="text-[#EF6C00]" /> Personal Information</h2>
                                    <button className="text-sm font-semibold text-[#EF6C00] hover:underline">Edit All</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 font-semibold">Full Name</label>
                                        <input type="text" className="w-full bg-[#1f1812] border border-[#3b2d22] rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#EF6C00]" defaultValue={user?.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 font-semibold">Email Address</label>
                                        <input type="email" className="w-full bg-[#1f1812] border border-[#3b2d22] rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#EF6C00]" defaultValue={user?.email} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 font-semibold">Phone Number</label>
                                        <input type="tel" className="w-full bg-[#1f1812] border border-[#3b2d22] rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#EF6C00]" placeholder="+91 00000 00000" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500 font-semibold">Nationality</label>
                                        <input type="text" className="w-full bg-[#1f1812] border border-[#3b2d22] rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#EF6C00]" defaultValue="Indian" />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-xs text-gray-500 font-semibold">Residential Address</label>
                                        <textarea className="w-full bg-[#1f1812] border border-[#3b2d22] rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#EF6C00] min-h-[100px]" defaultValue="128 Green Valley Residency, DLF Phase 5, Gurgaon, Haryana, 122002"></textarea>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Security */}
                        {activeTab === 'security' && (
                            <section>
                                <div className="flex justify-between items-end mb-6 border-b border-[#3b2d22] pb-4">
                                    <h2 className="text-xl font-bold flex items-center gap-2"><Shield className="text-[#EF6C00]" /> Security</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-5 bg-[#1f1812] border border-[#3b2d22] rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-[#15100B] p-2 rounded-lg text-[#EF6C00]"><Lock className="w-5 h-5" /></div>
                                            <div>
                                                <div className="font-semibold text-[#FDFBF7]">Password</div>
                                                <div className="text-xs text-gray-500">Last changed 3 months ago</div>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 border border-[#3b2d22] rounded-lg text-sm font-semibold hover:bg-[#2a2119] transition-colors">Change</button>
                                    </div>
                                    <div className="flex items-center justify-between p-5 bg-[#1f1812] border border-[#3b2d22] rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-[#17251a] p-2 rounded-lg text-green-500"><Shield className="w-5 h-5" /></div>
                                            <div>
                                                <div className="font-semibold text-[#FDFBF7]">Two-Factor Authentication</div>
                                                <div className="text-xs text-gray-500">Currently enabled via SMS</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-green-500 uppercase">Active</span>
                                            <button className="px-4 py-2 border border-[#3b2d22] rounded-lg text-sm font-semibold hover:bg-[#2a2119] transition-colors">Disable</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Saved Cards */}
                        {activeTab === 'cards' && (
                            <section>
                                <div className="flex justify-between items-end mb-6 border-b border-[#3b2d22] pb-4">
                                    <h2 className="text-xl font-bold flex items-center gap-2"><CreditCard className="text-[#EF6C00]" /> Saved Cards</h2>
                                </div>
                                <div className="space-y-4">
                                    {savedCards.map(card => (
                                        <div key={card.id} className="flex items-center justify-between p-5 bg-[#1f1812] border border-[#3b2d22] rounded-xl group hover:border-[#EF6C00] transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-[#EF6C00] p-2 rounded-md text-[#15100B]"><CreditCard className="w-6 h-6" /></div>
                                                <div>
                                                    <div className="font-semibold text-[#FDFBF7]">{card.type} ending in {card.last4}</div>
                                                    <div className="text-xs text-gray-500">Expires {card.expiry}</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveCard(card.id)}
                                                className="text-red-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => setShowAddCard(true)}
                                        className="flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#EF6C00]/10 text-[#EF6C00] rounded-lg text-sm font-bold border border-[#EF6C00]/20 hover:bg-[#EF6C00]/20 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Add New Card
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Preferences */}
                        {activeTab === 'notifications' && (
                            <section>
                                <div className="flex justify-between items-end mb-6 border-b border-[#3b2d22] pb-4">
                                    <h2 className="text-xl font-bold flex items-center gap-2"><Bell className="text-[#EF6C00]" /> Preferences & Alerts</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between p-5 bg-[#1f1812] border border-[#3b2d22] rounded-xl">
                                        <div>
                                            <div className="font-semibold text-sm">Email Notifications</div>
                                            <div className="text-xs text-gray-500">Promotions and booking updates</div>
                                        </div>
                                        <div className="w-10 h-6 bg-[#EF6C00] rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-5 bg-[#1f1812] border border-[#3b2d22] rounded-xl">
                                        <div>
                                            <div className="font-semibold text-sm">SMS Alerts</div>
                                            <div className="text-xs text-gray-500">Critical booking information</div>
                                        </div>
                                        <div className="w-10 h-6 bg-[#EF6C00] rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-5 bg-[#1f1812] border border-[#3b2d22] rounded-xl">
                                        <div>
                                            <div className="font-semibold text-sm">Marketing & Offers</div>
                                            <div className="text-xs text-gray-500">Special stay deals and rewards</div>
                                        </div>
                                        <div className="w-10 h-6 bg-[#3b2d22] rounded-full relative cursor-pointer">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-5 bg-[#1f1812] border border-[#3b2d22] rounded-xl">
                                        <div>
                                            <div className="font-semibold text-sm">App Push Notifications</div>
                                            <div className="text-xs text-gray-500">Real-time check-in alerts</div>
                                        </div>
                                        <div className="w-10 h-6 bg-[#EF6C00] rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-8 mt-12 border-t border-[#3b2d22]">
                            <button className="bg-[#EF6C00] text-[#1a140f] font-bold py-3 px-6 rounded-lg hover:bg-[#fb8c00] transition-colors shadow-lg shadow-[#EF6C00]/20">
                                Save Changes
                            </button>
                            <button className="bg-[#1f1812] border border-[#3b2d22] text-[#FDFBF7] font-semibold py-3 px-6 rounded-lg hover:bg-[#2a2119] transition-colors">
                                Cancel
                            </button>
                            <div className="flex-1"></div>
                            <button className="text-red-500 font-semibold text-sm hover:underline">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal: Add New Card */}
            <AnimatePresence>
                {showAddCard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowAddCard(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#1f1812] border border-[#3b2d22] rounded-2xl w-full max-w-md relative z-10 shadow-2xl p-6 sm:p-8"
                        >
                            <div className="flex justify-between items-center border-b border-[#3b2d22] mb-6 pb-4">
                                <h3 className="text-xl font-bold text-[#FDFBF7]">Add New Card</h3>
                                <button onClick={() => setShowAddCard(false)} className="text-gray-500 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setShowAddCard(false); }}>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-1">Cardholder Name</label>
                                    <div className="relative">
                                        <input type="text" className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#EF6C00] placeholder:text-[#4d3c2e]" placeholder="John Doe" required />
                                        <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-600" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-1">Card Number</label>
                                    <div className="relative">
                                        <input type="text" className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-2.5 pl-4 pr-20 focus:outline-none focus:border-[#EF6C00] placeholder:text-[#4d3c2e]" placeholder="0000 0000 0000 0000" maxLength={19} required />
                                        <div className="absolute right-3 top-2.5 flex gap-1">
                                            <div className="bg-[#EF6C00]/20 text-[#EF6C00] text-[8px] font-bold px-1.5 py-0.5 rounded border border-[#EF6C00]/30">VISA</div>
                                            <div className="bg-[#EF6C00]/20 text-[#EF6C00] text-[8px] font-bold px-1.5 py-0.5 rounded border border-[#EF6C00]/30">MC</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-1">Expiry Date</label>
                                        <input type="text" className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#EF6C00] placeholder:text-[#4d3c2e]" placeholder="MM / YY" maxLength={5} required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-1">CVV</label>
                                        <div className="relative">
                                            <input type="password" className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#EF6C00] placeholder:text-[#4d3c2e]" placeholder="•••" maxLength={4} required />
                                            <Shield className="absolute right-3 top-2.5 w-4 h-4 text-gray-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4 py-4 text-[10px] text-gray-500 font-semibold pb-2">
                                    <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#EF6C00]" /> Secure SSL Encryption</span>
                                    <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#EF6C00]" /> PCI DSS Compliant</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button type="submit" className="w-full bg-[#EF6C00] text-[#1a140f] font-bold py-3 px-4 rounded-lg hover:bg-[#fb8c00] transition-colors shadow-lg shadow-[#EF6C00]/20">
                                        Save Card
                                    </button>
                                    <button type="button" onClick={() => setShowAddCard(false)} className="w-full bg-[#15100B] border border-[#3b2d22] text-[#FDFBF7] font-semibold py-3 px-4 rounded-lg hover:bg-[#2a2119] transition-colors">
                                        Cancel
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

export default Profile;
