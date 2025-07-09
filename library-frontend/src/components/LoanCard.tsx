import React from 'react';

interface LoanCardProps {
  bookTitle: string;
  memberName: string;
  dueDate: string;
}

const LoanCard: React.FC<LoanCardProps> = ({ bookTitle, memberName, dueDate }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
    <h4>{bookTitle}</h4>
    <p>Loaned to: {memberName}</p>
    <p>Due: {dueDate}</p>
  </div>
);

export default LoanCard; 