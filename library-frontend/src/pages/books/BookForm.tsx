import React, { useState } from 'react';

const BookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Book: ${title} by ${author}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Add/Edit Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <button type="submit" style={{ width: '100%' }}>Save</button>
    </form>
  );
};

export default BookForm; 