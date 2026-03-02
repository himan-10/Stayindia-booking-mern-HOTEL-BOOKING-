import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { Users, Building, Building2, CheckCircle, XCircle } from 'lucide-react';

const AdminPanel = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [towers, setTowers] = useState([]);
    const [flats, setFlats] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchAdminData = async () => {
            try {
                const [bookingsRes, towersRes, flatsRes] = await Promise.all([
                    axiosClient.get('/bookings'),
                    axiosClient.get('/towers'),
                    axiosClient.get('/flats')
                ]);
                if (isMounted) {
                    setBookings(bookingsRes.data.data);
                    setTowers(towersRes.data.data);
                    setFlats(flatsRes.data.data);
                    setLoading(false);
                }
            } catch {
                if (isMounted) {
                    toast.error('Failed to load admin data');
                    setLoading(false);
                }
            }
        };
        fetchAdminData();
        return () => { isMounted = false; };
    }, []);

    const fetchAdminDataManual = async () => {
        try {
            const [bookingsRes, towersRes, flatsRes] = await Promise.all([
                axiosClient.get('/bookings'),
                axiosClient.get('/towers'),
                axiosClient.get('/flats')
            ]);
            setBookings(bookingsRes.data.data);
            setTowers(towersRes.data.data);
            setFlats(flatsRes.data.data);
            setLoading(false);
        } catch {
            toast.error('Failed to load admin data');
            setLoading(false);
        }
    };

    const updateBookingStatus = async (id, status) => {
        try {
            await axiosClient.put(`/bookings/${id}`, { status });
            toast.success(`Booking ${status.toLowerCase()} successfully`);
            fetchAdminDataManual(); // Refresh to update flat status if approved
        } catch {
            toast.error('Failed to update booking');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading admin panel...</div>;

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
                <p className="mt-2 text-sm text-gray-500">Manage towers, flats, and incoming booking requests.</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                                <Building2 className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Towers</dt>
                                    <dd className="text-2xl font-bold text-gray-900">{towers.length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                                <Building className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Flats</dt>
                                    <dd className="text-2xl font-bold text-gray-900">{flats.length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                                <Users className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                                    <dd className="text-2xl font-bold text-gray-900">{bookings.length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Bookings Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-100">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Booking Requests</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flat</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Move In</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">No bookings to show.</td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{booking.user?.name}</div>
                                            <div className="text-sm text-gray-500">{booking.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Flat {booking.flat?.flatNumber}</div>
                                            <div className="text-sm text-gray-500">{booking.flat?.tower?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(booking.moveInDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {booking.status === 'Pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => updateBookingStatus(booking._id, 'Approved')} className="text-green-600 hover:text-green-900 flex items-center gap-1 transition-colors">
                                                        <CheckCircle size={18} /> Approve
                                                    </button>
                                                    <button onClick={() => updateBookingStatus(booking._id, 'Rejected')} className="text-red-600 hover:text-red-900 flex items-center gap-1 transition-colors">
                                                        <XCircle size={18} /> Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
