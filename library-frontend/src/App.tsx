import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Auth
import Login from './pages/auth/Login';
import Unauthorized from './pages/auth/Unauthorized';
// Dashboard
import Dashboard from './pages/dashboard/Dashboard';
// Books
import BookList from './pages/books/BookList';
import BookForm from './pages/books/BookForm';
import BookDetails from './pages/books/BookDetails';
// Members
import MemberList from './pages/members/MemberList';
import MemberForm from './pages/members/MemberForm';
// Loans
import LoanList from './pages/loans/LoanList';
import LoanForm from './pages/loans/LoanForm';
// Reservations
import ReservationList from './pages/reservations/ReservationList';
import ReserveBook from './pages/reservations/ReserveBook';
// Reports
import LoansReport from './pages/reports/LoansReport';
import OverdueReport from './pages/reports/OverdueReport';
// NotFound
import NotFound from './pages/NotFound';

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <React.Suspense fallback={<Loader />}>
      <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/unauthorized" element={<Unauthorized />} />

        {/* Dashboard (protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'librarian', 'member']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Books (protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'librarian']} />}>
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Route>

        {/* Members (protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'librarian']} />}>
          <Route path="/members" element={<MemberList />} />
          <Route path="/members/new" element={<MemberForm />} />
        </Route>

        {/* Loans (protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'librarian']} />}>
          <Route path="/loans" element={<LoanList />} />
          <Route path="/loans/new" element={<LoanForm />} />
        </Route>

        {/* Reservations (protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'librarian', 'member']} />}>
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/reservations/new" element={<ReserveBook />} />
        </Route>

        {/* Reports (protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'librarian']} />}>
          <Route path="/reports" element={<LoansReport />} />
          <Route path="/reports/overdue" element={<OverdueReport />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  </BrowserRouter>
);

export default App;
