import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, BookOpen } from 'lucide-react'

// Sample data
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', status: 'Available' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0446310789', status: 'Borrowed' },
  { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0451524935', status: 'Available' },
]

export default function BookList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Books</h1>
          <p className="text-muted-foreground">
            Manage your library collection
          </p>
        </div>
        <Button asChild>
          <Link href="/books/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6">
        {books.map((book) => (
          <Card key={book.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                </div>
                <Badge variant={book.status === 'Available' ? 'default' : 'secondary'}>
                  {book.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Author:</span> {book.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">ISBN:</span> {book.isbn}
                </p>
                <div className="flex justify-end pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/books/${book.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 