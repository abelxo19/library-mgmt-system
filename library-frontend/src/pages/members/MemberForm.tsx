import React, { useState } from 'react';

const MemberForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Member: ${name} (${email})`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Add/Edit Member</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <button type="submit" style={{ width: '100%' }}>Save</button>
    </form>
  );
};

export default MemberForm; 