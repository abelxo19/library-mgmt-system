import Link from 'next/link'

interface BookCardProps {
  id: number
  title: string
  author: string
  isbn: string
  status: string
}

export default function BookCard({ id, title, author, isbn, status }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">by {author}</p>
      <p className="text-sm text-gray-500 mb-4">ISBN: {isbn}</p>
      
      <div className="flex justify-between items-center">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
        
        <Link 
          href={`/books/${id}`}
          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
} 