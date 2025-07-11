import '../styles/globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import AuthGate from '../components/AuthGate';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Library Management System',
  description: 'A simple library management system',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='px-10'>
        <AuthGate>
          <Navbar />
          {children}
        </AuthGate>
      </body>
    </html>
  );
}
