import Link from 'next/link'

// Sample data
const overdueLoans = [
  { 
    id: 1, 
    bookTitle: 'To Kill a Mockingbird', 
    memberName: 'Jane Smith', 
    borrowDate: '2024-01-10', 
    dueDate: '2024-02-10', 
    daysOverdue: 5 
  },
  { 
    id: 2, 
    bookTitle: 'The Catcher in the Rye', 
    memberName: 'Mike Wilson', 
    borrowDate: '2024-01-05', 
    dueDate: '2024-02-05', 
    daysOverdue: 10 
  },
  { 
    id: 3, 
    bookTitle: 'Lord of the Flies', 
    memberName: 'Sarah Johnson', 
    borrowDate: '2024-01-08', 
    dueDate: '2024-02-08', 
    daysOverdue: 7 
  },
]

export default function OverdueReport() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/reports" className="text-indigo-600 hover:text-indigo-900">
          ← Back to Reports
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Overdue Report</h1>
      
      {/* Summary */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-red-800 mb-2">Overdue Summary</h2>
        <p className="text-red-700">
          There are currently {overdueLoans.length} overdue books that need attention.
        </p>
      </div>
      
      {/* Overdue Loans Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Overdue Loans</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {overdueLoans.map((loan) => (
              <tr key={loan.id} className={loan.daysOverdue > 7 ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.bookTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.memberName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.borrowDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    loan.daysOverdue > 7 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {loan.daysOverdue} days
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Send Reminder</button>
                  <button className="text-green-600 hover:text-green-900">Mark Returned</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 