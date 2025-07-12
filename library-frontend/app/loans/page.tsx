"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getLoans, deleteLoan, returnBook } from '../../lib/loanService';
import { useAuth } from '../../lib/useAuth';
import Loader from '../../components/Loader';

interface Loan {
  _id: string;
  book: { title: string; author: string; isbn: string };
  member: { name: string; email: string };
  borrowDate: string;
  dueDate: string;
  status: string;
  returnDate?: string;
}

export default function LoanList() {
  const { token } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [returningId, setReturningId] = useState<string | null>(null);

  const fetchLoans = () => {
    if (!token) return;
    setLoading(true);
    getLoans(token)
      .then(data => {
        setLoans(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load loans');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLoans();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    setDeletingId(id);
    try {
      await deleteLoan(token, id);
      fetchLoans();
    } catch {
      setError('Failed to delete loan');
    } finally {
      setDeletingId(null);
    }
  };

  const handleReturn = async (id: string) => {
    if (!token) return;
    setReturningId(id);
    try {
      await returnBook(token, id);
      fetchLoans();
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

  if (loading) return <Loader message="Loading loans..." />;
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
        <h1 className="text-3xl font-bold text-gray-900">Loans</h1>
        <Link 
          href="/loans/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          New Loan
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {loan.book?.title || 'Unknown Book'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {loan.member?.name || 'Unknown Member'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(loan.borrowDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(loan.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    loan.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    loan.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {loan.status}
                    {loan.status === 'Active' && calculateDaysOverdue(loan.dueDate) > 0 && (
                      <span className="ml-1 text-red-600">
                        ({calculateDaysOverdue(loan.dueDate)} days overdue)
                      </span>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {loan.status === 'Active' && (
                    <button
                      onClick={() => handleReturn(loan._id)}
                      disabled={returningId === loan._id}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors disabled:opacity-50 mr-2"
                    >
                      {returningId === loan._id ? "Returning..." : "Return"}
                    </button>
                  )}
                  <Link
                    href={`/loans/edit/${loan._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(loan._id)}
                    disabled={deletingId === loan._id}
                  >
                    {deletingId === loan._id ? "Deleting..." : "Delete"}
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