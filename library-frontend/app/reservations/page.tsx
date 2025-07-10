import Link from 'next/link'

// Sample data
const reservations = [
  { 
    id: 1, 
    bookTitle: 'The Great Gatsby', 
    memberName: 'John Doe', 
    reserveDate: '2024-01-15', 
    status: 'Pending' 
  },
  { 
    id: 2, 
    bookTitle: 'To Kill a Mockingbird', 
    memberName: 'Jane Smith', 
    reserveDate: '2024-01-10', 
    status: 'Ready' 
  },
  { 
    id: 3, 
    bookTitle: '1984', 
    memberName: 'Bob Johnson', 
    reserveDate: '2024-01-20', 
    status: 'Cancelled' 
  },
]

export default function ReservationList() {
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
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.bookTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.memberName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.reserveDate}</td>
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
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Process</button>
                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 