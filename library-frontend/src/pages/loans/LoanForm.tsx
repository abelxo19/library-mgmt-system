import React, { useState } from 'react';

const LoanForm: React.FC = () => {
  const [book, setBook] = useState('');
  const [member, setMember] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Loan: ${book} to ${member}, due ${dueDate}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Create Loan</h2>
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
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <button type="submit" style={{ width: '100%' }}>Create Loan</button>
    </form>
  );
};

export default LoanForm; 