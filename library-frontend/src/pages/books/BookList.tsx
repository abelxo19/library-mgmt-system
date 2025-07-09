import React from 'react';
import BookCard from '../../components/BookCard';

const books = [
  { title: '1984', author: 'George Orwell' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

const BookList: React.FC = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Books</h2>
    {books.map((book, idx) => (
      <BookCard key={idx} title={book.title} author={book.author} />
    ))}
  </div>
);

export default BookList; 