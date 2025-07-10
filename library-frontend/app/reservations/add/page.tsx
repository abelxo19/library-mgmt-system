'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddReservation() {
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    reserveDate: ''
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, you'd call API to create reservation
    console.log('Creating reservation:', formData)
    router.push('/reservations')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/reservations" className="text-indigo-600 hover:text-indigo-900">
          ← Back to Reservations
        </Link>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Reservation</h1>
        
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
                <option value="1">The Great Gatsby</option>
                <option value="2">To Kill a Mockingbird</option>
                <option value="3">1984</option>
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
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                <option value="3">Bob Johnson</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="reserveDate" className="block text-sm font-medium text-gray-700 mb-2">
                Reserve Date *
              </label>
              <input
                type="date"
                id="reserveDate"
                name="reserveDate"
                required
                value={formData.reserveDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Create Reservation
            </button>
            <Link
              href="/reservations"
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