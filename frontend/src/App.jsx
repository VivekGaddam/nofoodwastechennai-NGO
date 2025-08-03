import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard.jsx';
import DonorForm from './components/DonorForm';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import DonorRegisterForm from './components/DonorRegisterForm';
import LoginForm from './components/LoginForm';
import Tasks from './components/Tasks'; 
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({}));
    localStorage.setItem('token', '');
    localStorage.setItem('admin', JSON.stringify({}));
  }, []);

  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-donor" element={<DonorRegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        
        <Route
          path="/donorform"
          element={
              <DonorForm />
          }
        />

        {/* Volunteer-only route */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute allowedRoles={['volunteer', 'staff']}>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* Dashboard for all roles except admin */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['donor', 'volunteer', 'staff']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin-only route */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
