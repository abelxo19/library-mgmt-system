"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../../../../lib/useAuth";
import { getBooks, updateBook } from "../../../../lib/bookService";
import FormField from "../../../../components/FormField";

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  publishDate: string;
  genre: string;
  description: string;
}

export default function EditBookPage() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const bookId = params.id as string;
  const [formData, setFormData] = useState({ title: "", author: "", isbn: "", publishDate: "", genre: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !bookId) return;
    getBooks(token)
      .then((data: Book[]) => {
        const book = data.find((b) => b._id === bookId);
        if (book) {
          setFormData({
            title: book.title || "",
            author: book.author || "",
            isbn: book.isbn || "",
            publishDate: book.publishDate ? book.publishDate.slice(0, 10) : "",
            genre: book.genre || "",
            description: book.description || "",
          });
        } else {
          setError("Book not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load book");
        setLoading(false);
      });
  }, [token, bookId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }
    try {
      if (token) {
        await updateBook(token, bookId, formData);
        router.push("/books");
      }
    } catch {
      setError("Failed to update book");
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-600">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-6">
        <Link href="/books" className="text-indigo-600 hover:text-indigo-900">
          ← Back to Books
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Book</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <FormField
            id="title"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <FormField
            id="author"
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <FormField
            id="isbn"
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
          <FormField
            id="publishDate"
            label="Publish Date"
            name="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={handleChange}
            required
          />
          <FormField
            id="genre"
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
          <FormField
            id="description"
            label="Description"
            name="description"
            type="textarea"
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
          {error && <div className="text-red-600 mt-4">{error}</div>}
          <div className="mt-8 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </motion.button>
            <Link
              href="/books"
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}