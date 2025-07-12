"use client";
import { useEffect, useState } from 'react';
import { getReadyReservations, fulfillReservation } from '../../../lib/reservationService';
import { useAuth } from '../../../lib/useAuth';
import Loader from '../../../components/Loader';

interface ReadyReservation {
  _id: string;
  book: { title: string; author: string; isbn: string };
  member: { name: string; email: string };
  reserveDate: string;
  status: string;
  priority?: number;
  notifiedAt?: string;
  expiresAt?: string;
}

export default function ReadyReservations() {
  const { token } = useAuth();
  const [readyReservations, setReadyReservations] = useState<ReadyReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fulfillingId, setFulfillingId] = useState<string | null>(null);

  const fetchReadyReservations = () => {
    if (!token) return;
    setLoading(true);
    getReadyReservations(token)
      .then(data => {
        setReadyReservations(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load ready reservations');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReadyReservations();
  }, [token]);

  const handleFulfill = async (reservationId: string) => {
    if (!token) return;
    setFulfillingId(reservationId);
    try {
      // Set due date to 14 days from now
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      
      await fulfillReservation(token, reservationId, dueDate.toISOString().split('T')[0]);
      fetchReadyReservations(); // Refresh the list
    } catch {
      setError('Failed to fulfill reservation');
    } finally {
      setFulfillingId(null);
    }
  };

  const calculateDaysUntilExpiry = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) return <Loader message="Loading ready reservations..." />;
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Ready Reservations</h1>
        <p className="text-gray-600 mt-2">
          {readyReservations.length} reservation{readyReservations.length !== 1 ? 's' : ''} ready for fulfillment
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserve Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {readyReservations.map((reservation) => (
              <tr key={reservation._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {reservation.book?.title || 'Unknown Book'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reservation.member?.name || 'Unknown Member'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(reservation.reserveDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reservation.notifiedAt ? new Date(reservation.notifiedAt).toLocaleDateString() : 'Not notified'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    calculateDaysUntilExpiry(reservation.expiresAt) <= 2 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {calculateDaysUntilExpiry(reservation.expiresAt)} days
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleFulfill(reservation._id)}
                    disabled={fulfillingId === reservation._id}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {fulfillingId === reservation._id ? "Fulfilling..." : "Fulfill"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {readyReservations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No ready reservations found.
          </div>
        )}
      </div>
    </div>
  );
} 