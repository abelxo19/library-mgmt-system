import React from 'react';
import MemberCard from '../../components/MemberCard';

const members = [
  { name: 'Alice Smith', email: 'alice@example.com' },
  { name: 'Bob Johnson', email: 'bob@example.com' },
];

const MemberList: React.FC = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Members</h2>
    {members.map((member, idx) => (
      <MemberCard key={idx} name={member.name} email={member.email} />
    ))}
  </div>
);

export default MemberList; 