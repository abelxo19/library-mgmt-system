import React from 'react';
import LoanCard from '../../components/LoanCard';

const loans = [
  { bookTitle: '1984', memberName: 'Alice Smith', dueDate: '2024-06-30' },
  { bookTitle: 'To Kill a Mockingbird', memberName: 'Bob Johnson', dueDate: '2024-07-05' },
];

const LoanList: React.FC = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Loans</h2>
    {loans.map((loan, idx) => (
      <LoanCard key={idx} {...loan} />
    ))}
  </div>
);

export default LoanList; 