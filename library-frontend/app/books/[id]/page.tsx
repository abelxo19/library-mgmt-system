import Link from 'next/link'

// Sample book data
const book = {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  isbn: '978-0743273565',
  status: 'Available',
  publishedYear: 1925,
  genre: 'Fiction',
  description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.'
}

export default function BookDetails({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/books" className="text-indigo-600 hover:text-indigo-900">
          ← Back to Books
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Author</dt>
                <dd className="text-sm text-gray-900">{book.author}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">ISBN</dt>
                <dd className="text-sm text-gray-900">{book.isbn}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Published Year</dt>
                <dd className="text-sm text-gray-900">{book.publishedYear}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Genre</dt>
                <dd className="text-sm text-gray-900">{book.genre}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {book.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-sm text-gray-600">{book.description}</p>
          </div>
        </div>
        
        <div className="mt-8 flex gap-4">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Borrow Book
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
            Reserve Book
          </button>
        </div>
      </div>
    </div>
  )
} 