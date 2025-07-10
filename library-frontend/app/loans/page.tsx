import Link from 'next/link'

// Sample data
const loans = [
  { 
    id: 1, 
    bookTitle: 'The Great Gatsby', 
    memberName: 'John Doe', 
    borrowDate: '2024-01-15', 
    dueDate: '2024-02-15', 
    status: 'Active' 
  },
  { 
    id: 2, 
    bookTitle: 'To Kill a Mockingbird', 
    memberName: 'Jane Smith', 
    borrowDate: '2024-01-10', 
    dueDate: '2024-02-10', 
    status: 'Overdue' 
  },
  { 
    id: 3, 
    bookTitle: '1984', 
    memberName: 'Bob Johnson', 
    borrowDate: '2024-01-20', 
    dueDate: '2024-02-20', 
    status: 'Active' 
  },
]

export default function LoanList() {
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Return</button>
                  <button className="text-gray-600 hover:text-gray-900">Extend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 