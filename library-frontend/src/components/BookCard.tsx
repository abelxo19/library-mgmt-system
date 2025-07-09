import React from 'react';

interface BookCardProps {
  title: string;
  author: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
    <h3>{title}</h3>
    <p>by {author}</p>
  </div>
);

export default BookCard; 