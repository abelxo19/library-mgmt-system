import React, { useState } from 'react';

const ReserveBook: React.FC = () => {
  const [book, setBook] = useState('');
  const [member, setMember] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reserved: ${book} for ${member}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Reserve Book</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={book}
        onChange={e => setBook(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Member Name"
        value={member}
        onChange={e => setMember(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <button type="submit" style={{ width: '100%' }}>Reserve</button>
    </form>
  );
};

export default ReserveBook; 