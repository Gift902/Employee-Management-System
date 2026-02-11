import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './Pages/EmployeeList';
import Settings from './Pages/Settings';
import EmployeeModal from './Pages/EmployeeModal';
import EmployeeUpdate from './Pages/EmployeeUpdate';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProtectedRoute from './components/ProtectedRoutes';
function App() {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/add" element={<EmployeeModal />} />
          <Route path="/update/:id" element={<EmployeeUpdate />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </EmployeeProvider>
    </BrowserRouter>
  );
}
export default App;
