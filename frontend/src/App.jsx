import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';

import useAuthStore from './store/useAuthStore';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Flats from './pages/Flats';
import FlatDetails from './pages/FlatDetails';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/admin/AdminPanel';
import Collections from './pages/Collections';
import Offers from './pages/Offers';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';

// New Pages
import About from './pages/About';
import OurHotels from './pages/OurHotels';
import Partner from './pages/Partner';
import Sustainability from './pages/Sustainability';

// Support Pages
import FAQs from './pages/FAQs';
import BookingPolicy from './pages/BookingPolicy';
import GiftVouchers from './pages/GiftVouchers';

// Wrapper for animated routes
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/flats" element={<PageTransition><Flats /></PageTransition>} />
        <Route path="/flats/:id" element={<PageTransition><FlatDetails /></PageTransition>} />
        <Route path="/collections" element={<PageTransition><Collections /></PageTransition>} />
        <Route path="/offers" element={<PageTransition><Offers /></PageTransition>} />
        <Route path="/support" element={<PageTransition><Support /></PageTransition>} />

        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/our-hotels" element={<PageTransition><OurHotels /></PageTransition>} />
        <Route path="/partner-with-us" element={<PageTransition><Partner /></PageTransition>} />
        <Route path="/sustainability" element={<PageTransition><Sustainability /></PageTransition>} />

        <Route path="/faqs" element={<PageTransition><FAQs /></PageTransition>} />
        <Route path="/booking-policy" element={<PageTransition><BookingPolicy /></PageTransition>} />
        <Route path="/gift-vouchers" element={<PageTransition><GiftVouchers /></PageTransition>} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout/:id" element={<Checkout />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#2a2119] text-white font-sans flex flex-col font-['Inter']">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
      </div>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
