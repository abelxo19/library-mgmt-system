"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getReservations, deleteReservation } from '../../lib/reservationService';
import { useAuth } from '../../lib/useAuth';
import Loader from '../../components/Loader';

interface Reservation {
  _id: string;
  book: { title: string; author: string; isbn: string };
  member: { name: string; email: string };
  reserveDate: string;
  status: string;
  priority?: number;
  notifiedAt?: string;
  expiresAt?: string;
}

export default function ReservationList() {
  const { token } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchReservations = () => {
    if (!token) return;
    setLoading(true);
    getReservations(token)
      .then(data => {
        setReservations(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reservations');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReservations();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    setDeletingId(id);
    try {
      await deleteReservation(token, id);
      fetchReservations();
    } catch {
      setError('Failed to delete reservation');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loader message="Loading reservations..." />;
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reservations</h1>
        <Link 
          href="/reservations/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          New Reservation
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserve Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {reservation.book?.title || 'Unknown Book'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reservation.member?.name || 'Unknown Member'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(reservation.reserveDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    reservation.status === 'Ready' ? 'bg-green-100 text-green-800' : 
                    reservation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/reservations/edit/${reservation._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(reservation._id)}
                    disabled={deletingId === reservation._id}
                  >
                    {deletingId === reservation._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 