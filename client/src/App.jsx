import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './Pages/EmployeeList';
import Settings from './Pages/Settings';
import EmployeeModal from './Pages/EmployeeModal';
import EmployeeUpdate from './Pages/EmployeeUpdate';
function App() {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path='/add' element={<EmployeeModal />}></Route>
          <Route path='/update/:id' element={<EmployeeUpdate />}></Route>
        </Routes>
      </EmployeeProvider>
    </BrowserRouter>
  );
}
export default App;
