import React from 'react';

interface ReservationCardProps {
  bookTitle: string;
  memberName: string;
  reservedDate: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ bookTitle, memberName, reservedDate }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
    <h4>{bookTitle}</h4>
    <p>Reserved by: {memberName}</p>
    <p>On: {reservedDate}</p>
  </div>
);

export default ReservationCard; 