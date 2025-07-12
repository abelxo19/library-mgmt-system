"use client";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react';
import { getBooks } from '../../lib/bookService';
import { useAuth } from '../../lib/useAuth';
import Loader from '../../components/Loader';

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  status: string;
  description?: string;
  genre?: string;
}

export default function BookList() {
  const { token } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getBooks(token)
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load books');
        setLoading(false);
      });
  }, [token]);

  if (loading) return <Loader message="Loading books..." />;
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    </div>
  );

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
          <Card key={book._id} className="hover:shadow-md transition-shadow">
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
                    <Link href={`/books/${book._id}`}>
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