import React, { createContext, useContext, useState } from 'react';
import { mockEmployees } from '../data/mockData';

const EmployeeContext = createContext(undefined);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(mockEmployees);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};
