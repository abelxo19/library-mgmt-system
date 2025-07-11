"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useAuth } from "../../../lib/useAuth";
import { getBooks } from "../../../lib/bookService";

export default function BookDetailPage() {
  const { token } = useAuth();
  const params = useParams();
  const bookId = params.id as string;
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !bookId) return;
    getBooks(token)
      .then((data) => {
        const found = data.find((b: any) => b._id === bookId);
        if (found) setBook(found);
        else setError("Book not found");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load book");
        setLoading(false);
      });
  }, [token, bookId]);

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-600">{error}</div>;
  if (!book) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/books" className="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Books
        </Link>
      </div>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center mb-4">
          <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
        </div>
        <div className="space-y-2">
          <div><span className="font-medium">Author:</span> {book.author}</div>
          <div><span className="font-medium">ISBN:</span> {book.isbn}</div>
          <div><span className="font-medium">Publish Date:</span> {book.publishDate ? book.publishDate.slice(0, 10) : "-"}</div>
          <div><span className="font-medium">Genre:</span> {book.genre || "-"}</div>
          <div><span className="font-medium">Description:</span> {book.description || "-"}</div>
          <div><span className="font-medium">Status:</span> {book.status || "Available"}</div>
        </div>
      </div>
    </div>
  );
}