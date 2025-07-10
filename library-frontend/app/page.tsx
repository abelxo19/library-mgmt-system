import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Library Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/books" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Books</h2>
            <p className="text-gray-600">Manage library books and catalog</p>
          </div>
        </Link>
        
        <Link href="/members" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Members</h2>
            <p className="text-gray-600">Manage library members</p>
          </div>
        </Link>
        
        <Link href="/loans" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Loans</h2>
            <p className="text-gray-600">Track book loans and returns</p>
          </div>
        </Link>
        
        <Link href="/reservations" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Reservations</h2>
            <p className="text-gray-600">Manage book reservations</p>
          </div>
        </Link>
        
        <Link href="/reports/loans" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Reports</h2>
            <p className="text-gray-600">View library reports</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
