import React from 'react';

interface MemberCardProps {
  name: string;
  email: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ name, email }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
    <h3>{name}</h3>
    <p>{email}</p>
  </div>
);

export default MemberCard; 