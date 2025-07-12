"use client";
import { useEffect, useState } from 'react';
import { getOverdueLoans, returnBook } from '../../../lib/loanService';
import { useAuth } from '../../../lib/useAuth';
import Loader from '../../../components/Loader';

interface OverdueLoan {
  _id: string;
  book: { title: string; author: string; isbn: string };
  member: { name: string; email: string };
  borrowDate: string;
  dueDate: string;
  status: string;
}

export default function OverdueReport() {
  const { token } = useAuth();
  const [overdueLoans, setOverdueLoans] = useState<OverdueLoan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [returningId, setReturningId] = useState<string | null>(null);

  const fetchOverdueLoans = () => {
    if (!token) return;
    setLoading(true);
    getOverdueLoans(token)
      .then(data => {
        setOverdueLoans(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load overdue loans');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOverdueLoans();
  }, [token]);

  const handleReturn = async (loanId: string) => {
    if (!token) return;
    setReturningId(loanId);
    try {
      await returnBook(token, loanId);
      fetchOverdueLoans(); // Refresh the list
    } catch {
      setError('Failed to return book');
    } finally {
      setReturningId(null);
    }
  };

  const calculateDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) return <Loader message="Loading overdue loans..." />;
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
        <h1 className="text-3xl font-bold text-gray-900">Overdue Loans Report</h1>
        <p className="text-gray-600 mt-2">
          {overdueLoans.length} overdue loan{overdueLoans.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {overdueLoans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {loan.book?.title || 'Unknown Book'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {loan.member?.name || 'Unknown Member'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(loan.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    {calculateDaysOverdue(loan.dueDate)} days
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleReturn(loan._id)}
                    disabled={returningId === loan._id}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {returningId === loan._id ? "Returning..." : "Return Book"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {overdueLoans.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No overdue loans found.
          </div>
        )}
      </div>
    </div>
  );
} 