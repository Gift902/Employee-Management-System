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
function App() {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path="employees" element={<EmployeeList />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path='/add' element={<EmployeeModal />}></Route>
          <Route path='/update/:id' element={<EmployeeUpdate />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </EmployeeProvider>
    </BrowserRouter>
  );
}
export default App;
