import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav style={{ padding: '1rem', background: '#f5f5f5' }}>
    <Link to="/dashboard">Dashboard</Link> |{' '}
    <Link to="/books">Books</Link> |{' '}
    <Link to="/members">Members</Link> |{' '}
    <Link to="/loans">Loans</Link> |{' '}
    <Link to="/reservations">Reservations</Link> |{' '}
    <Link to="/reports">Reports</Link>
  </nav>
);

export default Navbar; 