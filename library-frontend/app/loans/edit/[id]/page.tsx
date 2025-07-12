'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { getLoan, updateLoan } from '../../../../lib/loanService';
import { getBooks } from '../../../../lib/bookService';
import { getMembers } from '../../../../lib/memberService';
import { useAuth } from '../../../../lib/useAuth';

export default function EditLoan() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const loanId = params.id as string;
  
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    borrowDate: '',
    dueDate: ''
  });
  const [books, setBooks] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !loanId) return;
    
    // Fetch loan data and populate form
    Promise.all([
      getLoan(token, loanId),
      getBooks(token),
      getMembers(token)
    ]).then(([loanData, booksData, membersData]) => {
      setBooks(booksData);
      setMembers(membersData);
      
      // Format dates for input fields
      const borrowDate = new Date(loanData.borrowDate).toISOString().split('T')[0];
      const dueDate = new Date(loanData.dueDate).toISOString().split('T')[0];
      
      setFormData({
        bookId: loanData.book?._id || loanData.bookId || '',
        memberId: loanData.member?._id || loanData.memberId || '',
        borrowDate,
        dueDate
      });
      setInitialLoading(false);
    }).catch(() => {
      setError('Failed to load loan data');
      setInitialLoading(false);
    });
  }, [token, loanId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setLoading(true);
    setError('');
    
    try {
      await updateLoan(token, loanId, formData);
      router.push('/loans');
    } catch (err) {
      setError('Failed to update loan');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (initialLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/loans" className="text-indigo-600 hover:text-indigo-900">
          ← Back to Loans
        </Link>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Loan</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-2">
                Book *
              </label>
              <select
                id="bookId"
                name="bookId"
                required
                value={formData.bookId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title} by {book.author}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-2">
                Member *
              </label>
              <select
                id="memberId"
                name="memberId"
                required
                value={formData.memberId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a member</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name} ({member.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700 mb-2">
                Borrow Date *
              </label>
              <input
                type="date"
                id="borrowDate"
                name="borrowDate"
                required
                value={formData.borrowDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                required
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Loan'}
            </button>
            <Link
              href="/loans"
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 