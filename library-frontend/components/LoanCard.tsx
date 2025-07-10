interface LoanCardProps {
  id: number
  bookTitle: string
  memberName: string
  borrowDate: string
  dueDate: string
  status: string
}

export default function LoanCard({ id, bookTitle, memberName, borrowDate, dueDate, status }: LoanCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{bookTitle}</h3>
      <p className="text-gray-600 mb-2">Borrowed by: {memberName}</p>
      <div className="text-sm text-gray-500 mb-4">
        <p>Borrow Date: {borrowDate}</p>
        <p>Due Date: {dueDate}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
        
        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
          Return Book
        </button>
      </div>
    </div>
  )
} 