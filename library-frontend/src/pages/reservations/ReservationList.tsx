import React from 'react';
import ReservationCard from '../../components/ReservationCard';

const reservations = [
  { bookTitle: '1984', memberName: 'Alice Smith', reservedDate: '2024-06-20' },
  { bookTitle: 'To Kill a Mockingbird', memberName: 'Bob Johnson', reservedDate: '2024-06-22' },
];

const ReservationList: React.FC = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Reservations</h2>
    {reservations.map((reservation, idx) => (
      <ReservationCard key={idx} {...reservation} />
    ))}
  </div>
);

export default ReservationList; 