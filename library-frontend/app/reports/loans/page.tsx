import Link from 'next/link'

// Sample data
const loanStats = {
  totalLoans: 45,
  activeLoans: 32,
  overdueLoans: 8,
  returnedThisMonth: 15
}

const recentLoans = [
  { id: 1, bookTitle: 'The Great Gatsby', memberName: 'John Doe', borrowDate: '2024-01-15', dueDate: '2024-02-15', status: 'Active' },
  { id: 2, bookTitle: 'To Kill a Mockingbird', memberName: 'Jane Smith', borrowDate: '2024-01-10', dueDate: '2024-02-10', status: 'Overdue' },
  { id: 3, bookTitle: '1984', memberName: 'Bob Johnson', borrowDate: '2024-01-20', dueDate: '2024-02-20', status: 'Active' },
]

export default function LoansReport() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/reports" className="text-indigo-600 hover:text-indigo-900">
          ← Back to Reports
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Loans Report</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Total Loans</h3>
          <p className="text-3xl font-bold text-indigo-600">{loanStats.totalLoans}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Active Loans</h3>
          <p className="text-3xl font-bold text-green-600">{loanStats.activeLoans}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Overdue Loans</h3>
          <p className="text-3xl font-bold text-red-600">{loanStats.overdueLoans}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Returned This Month</h3>
          <p className="text-3xl font-bold text-blue-600">{loanStats.returnedThisMonth}</p>
        </div>
      </div>
      
      {/* Recent Loans Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Loans</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentLoans.map((loan) => (
              <tr key={loan.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.bookTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.memberName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.borrowDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    loan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {loan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 